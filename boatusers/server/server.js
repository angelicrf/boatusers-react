const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000
let saveData = []

app.use(express.json());
app.use(cors({ origin: true }));

app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    res.json({
        "msg": "sucessReact"
    })
})
app.post('/about', async (req, res) => {
    /*     let getName = req.params.clName
        console.log(`postBody ${JSON.stringify(req.body)}`)
        console.log(`postParam ${JSON.stringify(getName)}`) */
    res.sendFile('aboutpage')

})
app.post('/api/map/data', async (req, res) => {
    console.log(`postBody ${JSON.stringify(req.body)}`)
    if (JSON.stringify(req.body) !== null) {
        saveData.push(req.body)
        res.json({ postData: `${JSON.stringify(req.body)}` })
    } else {
        res.json({ err: 'error' })
    }

})
app.get('/api/map/data', async (req, res) => {
    console.log(saveData)
    if (saveData.length > 0) {
        res.json({ success: saveData })
    } else
        res.json({ err: 'err' })
})
app.listen(port, () => console.log(`app is listening to ${port}`))

module.exports = app