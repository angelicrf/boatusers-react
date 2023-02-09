const express = require('express')
const cors = require('cors')
const app = express()
const { createProxyMiddleware } = require('http-proxy-middleware')
const port = process.env.PORT || 5000
let saveData = []
let searchMarkerInfo = []
let allMarkers = []

app.use(express.json())
app.use(cors({ origin: true }))

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
    msg: 'sucessReact',
  })
})
app.get('/api/test', async (req, res) => {
  res.json({
    msg: 'sucessAPITest',
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
    searchMarkerInfo = []
    searchMarkerInfo.push(req.body)
    res.json({ postSearchMarkerData: `${JSON.stringify(req.body)}` })
  } else {
    res.json({ err: 'error' })
  }
})
app.get('/api/map/marker/data', async (req, res) => {
  console.log(searchMarkerInfo)
  if (searchMarkerInfo.length > 0) {
    res.json({ success: searchMarkerInfo })
    markerInfo = []
  } else res.json({ err: 'err' })
})
app.post('/api/map/markers/data', async (req, res) => {
  console.log(`postMarkersBody ${JSON.stringify(req.body)}`)
  if (JSON.stringify(req.body) !== null) {
    allMarkers = []
    allMarkers.push(req.body)
    res.json({ postMarkersData: `${JSON.stringify(req.body)}` })
  } else {
    res.json({ err: 'error' })
  }
})
app.get('/api/map/markers/data', async (req, res) => {
  console.log(allMarkers)
  if (allMarkers.length > 0) {
    res.json({ success: allMarkers })
    allMarkers = []
  } else res.json({ err: 'err' })
})
app.get('/api/map/data', async (req, res) => {
  console.log(saveData)
  if (saveData.length > 0) {
    res.json({ success: saveData })
  } else res.json({ err: 'err' })
})
app.listen(port, () => console.log(`app is listening to ${port}`))

module.exports = app
