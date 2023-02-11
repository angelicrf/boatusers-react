export function getCurrentWeather() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((pos) => resolve(pos.coords))
  })
}

export async function postWCity(thisCity) {
  let inputCity = {
    thisCity,
  }
  return new Promise(async (resolve, reject) => {
    try {
      let thisResponse = await fetch(`http://localhost:5000/api/weather/data`, {
        body: JSON.stringify(inputCity),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
      })
      let sendCityData = await thisResponse.json()
      console.log(sendCityData)
      resolve(sendCityData)
    } catch (error) {
      reject(error)
    }
  })
}
export async function postWCoords(thisCoords) {
  let inputCity = {
    thisCoords,
  }
  return new Promise(async (resolve, reject) => {
    try {
      let thisResponse = await fetch(
        `http://localhost:5000/api/weather/coords/data`,
        {
          body: JSON.stringify(inputCity),
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
          mode: 'cors',
          redirect: 'follow',
        },
      )
      let sendCoordsData = await thisResponse.json()
      console.log(sendCoordsData)
      resolve(sendCoordsData)
    } catch (error) {
      reject(error)
    }
  })
}
