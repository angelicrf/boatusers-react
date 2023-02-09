export function postWCity(thisCity) {
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
