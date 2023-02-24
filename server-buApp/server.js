const express = require('express')
const cors = require('cors')
const app = express()
const { payPalData } = require('./JS/payPalConfig')
const paypal = require('paypal-rest-sdk')
const { createProxyMiddleware } = require('http-proxy-middleware')
const {
  getWeatherInfo,
  getCoordinates,
  getCurrentWInfo,
  convertLongLat,
} = require('./JS/weatherApiRequests')
const { json } = require('express')
const port = process.env.PORT || 5000
let saveData = []
let searchMarkerInfo = []
let allMarkers = []
let saveWinfo = []
let saveCurrentCoords = []
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
if (paypal) {
  paypal.configure({
    mode: 'sandbox',
    client_id:
      'AWTeL4kMDevIsCS-YZzuwnpA2qET4Sb6zGapzyWN1py_CdjzNjFsBKmipq-0HdZqswRBgZO7MFr2gjcW',
    client_secret:
      'EHOWisVj98EI8hOfAG_9PHTGnca36cW5LPNzicJFvflitSehl9GgjL47adBLGfzVeyEDY7J7INK2OXfe',
  })
}
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
app.get('/api/map/data', (req, res) => {
  console.log(saveData)
  if (saveData.length > 0) {
    res.json({ success: saveData })
  } else res.json({ err: 'err' })
})
app.post('/api/weather/data', async (req, res) => {
  console.log(`postWeatherDataBody ${JSON.stringify(req.body)}`)
  if (JSON.stringify(req.body) !== null) {
    let getWResult = await getWeatherInfo(req.body)
    if (getWResult) {
      saveWinfo = []
      saveWinfo.push({ dayWCurrent: getWResult.current_weather })
      res.json({ postWeatherData: saveWinfo })
    } else {
      res.json({ err: 'errorRequest' })
    }
  } else {
    res.json({ err: 'error' })
  }
})
app.post('/api/weather/coords/data', async (req, res) => {
  console.log(`postWCoordsDataBody ${JSON.stringify(req.body)}`)
  if (JSON.stringify(req.body) !== null) {
    let getWCoordsResult = await getCurrentWInfo(req.body)
    let getCityText = await convertLongLat(req.body)
    if (getWCoordsResult && getCityText) {
      saveCurrentCoords = []
      saveCurrentCoords.push({
        dayWCurrentCoords: getWCoordsResult,
        getCityInfo: getCityText,
      })
      res.json({ postWeatherCoords: saveCurrentCoords })
    } else {
      res.json({ err: 'errorWCoordsRequest' })
    }
  } else {
    res.json({ err: 'error' })
  }
})
app.get('/api/weather/data', (req, res) => {
  console.log(saveWinfo)
  if (saveWinfo.length > 0) {
    res.json({ success: saveWinfo })
    saveWinfo = []
  } else res.json({ err: 'err' })
})
app.get('/api/weather/coords/data', (req, res) => {
  if (saveCurrentCoords.length > 0) {
    res.json({
      success: saveCurrentCoords[0].dayWCurrentCoords.current_weather,
      cityInfo: saveCurrentCoords[0].getCityInfo,
    })
    saveCurrentCoords = []
  } else res.json({ err: 'err' })
})
app.post('/api/paypal/pay', async (req, res) => {
  let getTotalAmount = req.query
  let totalAmount = getTotalAmount.totalAmount
  let arrayParam = JSON.parse(getTotalAmount.itemArray)

  if (getTotalAmount && totalAmount && arrayParam.length > 0) {
    let getDataArray = await payPalData(arrayParam)
    console.log('GetDataArray ', getDataArray)
    if (getDataArray.length > 0) {
      console.log('insideHoldArray')
      const paypal_payment = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        redirect_urls: {
          return_url: `http://localhost:5000/api/paypal/success?totalAmount=${totalAmount}`,
          cancel_url: 'http://localhost:5000/api/paypal/cancel',
        },
        transactions: [
          {
            item_list: {
              items: getDataArray,
            },
            amount: {
              currency: 'USD',
              total: `${totalAmount}`,
            },
            description: 'Boat Users Customer Order',
          },
        ],
      }
      paypal.payment.create(paypal_payment, function (error, payment) {
        if (error) {
          res
            .status(200)
            .redirect(
              'http://localhost:3000/Cart?errorValue=Paypal-Payment-Error',
            )
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            console.log(payment.links)
            //boatusers.managementservices@gmail.com testdeveloper
            //buyerboatusers@personal.example.com
            //sellerboatusers@business.example.com
            if (payment.links[i].rel === 'approval_url') {
              res.redirect(payment.links[i].href)
            }
          }
        }
      })
    } else {
      res
        .status(200)
        .redirect('http://localhost:3000/Cart?errorValue=failed-toSet-items')
    }
  } else {
    res
      .status(200)
      .redirect('http://localhost:3000/Cart?errorValue=faled-toLogin')
  }
})
app.get('/api/paypal/success', (req, res) => {
  const totalAmount = req.query.totalAmount
  const payerId = req.query.PayerID
  const paymentId = req.query.paymentId
  console.log(totalAmount)
  if (totalAmount && payerId && paymentId) {
    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: 'USD',
            total: `${totalAmount}`,
          },
        },
      ],
    }

    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          console.log(error.response)
          res
            .status(200)
            .redirect('http://localhost:3000/Cart?errorValue=payPalError')
        } else {
          console.log(JSON.stringify(payment))
          res.status(200).redirect('http://localhost:3000/Cart?thisValue=sent')
        }
      },
    )
  } else {
    res.status(200).redirect('http://localhost:3000/Cart?errorValue=faledToPay')
  }
})
app.get('/api/paypal/cancel', (req, res) => {
  res
    .status(200)
    .redirect('http://localhost:3000/Cart?errorValue=transactionCanceled')
})

app.listen(port, () => console.log(`app is listening to ${port}`))

module.exports = app
