const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000

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
app.listen(port, () => console.log(`app is listening to ${port}`))

module.exports = app