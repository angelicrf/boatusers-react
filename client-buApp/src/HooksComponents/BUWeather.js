import React, { useEffect, useState } from 'react'
import UserName from '../FuncComponents/UserName'
import BUNavBar from '../FuncComponents/BUNavBar'
import { postWCity, getCurrentWeather, postWCoords } from '../JS/weatherData'

export default function BUWeather() {
  const [wData, setWData] = useState('')
  const [isClicked, setIsClicked] = useState(false)
  const [wDisplayData, setWDisplayData] = useState([])
  const [wCurrentDisplayData, setWCurrentDisplayData] = useState([])
  const [isCurrentW, setIsCurrentW] = useState(false)
  const [currentCoords, setCurrentCoords] = useState([])

  useEffect(() => {
    const showCurrentW = async () => {
      if (!isCurrentW) {
        let displayCurrentW = await getCurrentWeather()
        if (displayCurrentW) {
          setCurrentCoords([
            {
              long: displayCurrentW.longitude,
              lat: displayCurrentW.latitude,
            },
          ])
          if (currentCoords.length > 0) {
            setIsCurrentW(true)
          }
        }
        if (currentCoords.length > 0) {
          console.log(currentCoords)
          let getWresult = await postWCoords(currentCoords)
          if (getWresult) {
            fetch('http://localhost:5000/api/weather/coords/data', {
              cache: 'no-cache',
              credentials: 'same-origin',
              headers: {
                'content-type': 'application/json',
              },
              method: 'GET',
              mode: 'cors',
              redirect: 'follow',
              referrer: 'no-referrer',
            })
              .then(function (response) {
                return response.json()
              })
              .then(function (myJson) {
                if (!myJson.err) {
                  console.log(myJson.success.winddirection)
                  setWCurrentDisplayData([
                    myJson.cityInfo.place_name,
                    myJson.success.winddirection,
                    myJson.success.windspeed,
                    myJson.success.temperature,
                  ])
                }
              })
              .catch((err) => console.log(err))
          }
        }
      }
    }
    showCurrentW()

    if (isClicked) {
      fetch('http://localhost:5000/api/weather/data', {
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json',
        },
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (myJson) {
          if (!myJson.err) {
            myJson.success.map((data) => {
              setWDisplayData([data.dayWCurrent])
            })
          }
        })
        .catch((err) => console.log(err))
    }
  }, [isClicked, wDisplayData, currentCoords])

  const handleSubmitInput = async (e) => {
    setIsClicked(false)
    setWDisplayData([])
    e.preventDefault()
    let postData = await postWCity(wData)
    if (postData) {
      setIsClicked(true)
    }
  }
  return (
    <div>
      <BUNavBar />
      <div>BUWeather</div>
      <UserName />
      <div className='container'>
        <form onSubmit={handleSubmitInput} name='weather_form'>
          <label>Search City</label> <br />
          <input
            type='text'
            value={wData}
            required
            placeholder='City'
            onChange={(e) => setWData(e.target.value)}
          />
          <button className='btn btn-primary mt-2' type='submit'>
            Info
          </button>
        </form>
      </div>
      <>
        {wCurrentDisplayData.length > 0 ? (
          <div
            style={{ backgroundColor: 'red', height: '280px' }}
            className='container rounded pt-3 mb-2'
          >
            <div className='card'>
              <div className='card-body'>
                <h4 className='card-title'>User Current Location Info :</h4>
                <p className='card-text'>
                  My Coords : <i className='bi bi-geo-fill'></i>{' '}
                  {String(currentCoords[0].long)},{String(currentCoords[0].lat)}
                </p>
                <p className='card-text'>
                  My Location : <i className='bi bi-geo-alt-fill'></i>
                  {String(wCurrentDisplayData[0])}
                </p>
                <p className='card-text'>
                  Wind Direction : <i className='bi bi-compass'></i>
                  {String(wCurrentDisplayData[1])}
                </p>
                <p className='card-text'>
                  Wind speed : <i className='bi bi-speedometer'></i>
                  {String(wCurrentDisplayData[2])}
                </p>
                <p className='card-text'>
                  Tempreture : <i className='bi bi-thermometer-half'></i>
                  {String(wCurrentDisplayData[3])}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </>
      {wDisplayData.length > 0
        ? wDisplayData.map((data, index) => (
            <div className='container mt-4' key={index}>
              <div className='card'>
                <div className='card-body'>
                  <h4 className='card-title'>
                    <i class='bi bi-geo-alt-fill'></i> {wData}
                  </h4>
                  <p className='card-text'>
                    Wind Speed: <i class='bi bi-speedometer'></i>{' '}
                    {data.windspeed}
                  </p>
                  <p className='card-text'>
                    Wind Direction: <i class='bi bi-compass'></i>{' '}
                    {data.winddirection}
                  </p>
                  <p className='card-text'>
                    Tempreture: <i class='bi bi-thermometer-half'></i>{' '}
                    {data.temperature}
                  </p>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  )
}
