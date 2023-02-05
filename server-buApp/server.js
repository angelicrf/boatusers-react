const express = require('express');
const cors = require("cors");
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = process.env.PORT || 5000
let saveData = []
let markerInfo = []

app.use(express.json());
app.use(cors({ origin: true }));

app.use(express.urlencoded({ extended: true }))
/* app.use(
    '/api',
    createProxyMiddleware({
        target: 'http://0.0.0.0:5000',
        changeOrigin: true,
    })
);
app.use(
    '/',
    createProxyMiddleware({
        target: 'http://0.0.0.0:5000',
        changeOrigin: true,
    })
); */
app.get('/', async (req, res) => {
    res.json({
        "msg": "sucessReact"
    })
})
app.get('/api/test', async (req, res) => {
    res.json({
        "msg": "sucessAPITest"
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
app.post('/api/map/marker/data', async (req, res) => {
    console.log(`postMarkerBody ${JSON.stringify(req.body)}`)
    if (JSON.stringify(req.body) !== null) {
        markerInfo.push(req.body)
        res.json({ postMarkerData: `${JSON.stringify(req.body)}` })
    } else {
        res.json({ err: 'error' })
    }
})
app.get('/api/map/marker/data', async (req, res) => {
    console.log(markerInfo)
    if (markerInfo.length > 0) {
        res.json({ success: markerInfo })
        markerInfo = []
    } else
        res.json({ err: 'err' })
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