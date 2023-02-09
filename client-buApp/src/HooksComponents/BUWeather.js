import React, { useEffect, useState } from 'react'
import UserName from '../FuncComponents/UserName'
import BUNavBar from '../FuncComponents/BUNavBar'
import { postWCity } from '../JS/weatherData'

export default function BUWeather() {
  const [wData, setWData] = useState('')
  const [isClicked, setIsClicked] = useState(false)
  const [wDisplayData, setWDisplayData] = useState([])

  useEffect(() => {
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
  }, [isClicked, wDisplayData])

  const handleSubmitInput = async (e) => {
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
      {wDisplayData.length > 0
        ? wDisplayData.map((data, index) => (
            <div className='container' key={index}>
              <div className='card'>
                <div className='card-body'>
                  <h4 className='card-title'>City: {wData}</h4>
                  <p className='card-text'>Wind Speed is {data.windspeed}</p>
                  <p className='card-text'>
                    Wind Direction is {data.winddirection}
                  </p>
                  <p className='card-text'>Tempreture is {data.temperature}</p>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  )
}
