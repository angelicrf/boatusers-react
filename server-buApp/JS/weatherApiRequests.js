function getCoordinates(thisCity) {
  return new Promise((resolve, reject) => {
    let thisUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${thisCity.thisCity}`
    console.log(`thisUrlServer ${thisUrl}`)
    fetch(`${thisUrl}`, {
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
      mode: 'cors',
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        resolve(myJson)
      })
      .catch((err) => console.log(err))
  })
}
async function getWeatherInfo(thisLocation) {
  let findCoords = await getCoordinates(thisLocation)
  let getResult = findCoords.results.filter((data, index) => {
    if (findCoords.results.indexOf(data) === 0) {
      return data
    }
  })
  console.log(getResult[0].longitude)

  let thisUrl = `https://api.open-meteo.com/v1/forecast?latitude=${getResult[0].latitude}&longitude=${getResult[0].longitude}&current_weather=true&temperature_unit=fahrenheit&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
  return new Promise((resolve, reject) => {
    fetch(`${thisUrl}`, {
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
      mode: 'cors',
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        resolve(myJson)
      })
      .catch((err) => console.log(err))
  })
}
async function getCurrentWInfo(thisCoords) {
  console.log(`ThisCoords is ${JSON.stringify(thisCoords)}`)
  let thisUrl = `https://api.open-meteo.com/v1/forecast?latitude=${thisCoords.thisCoords[0].lat}&longitude=${thisCoords.thisCoords[0].long}&current_weather=true&temperature_unit=fahrenheit&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
  return new Promise((resolve, reject) => {
    fetch(`${thisUrl}`, {
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
      mode: 'cors',
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        resolve(myJson)
      })
      .catch((err) => console.log(err))
  })
}
module.exports = { getWeatherInfo, getCoordinates, getCurrentWInfo }
