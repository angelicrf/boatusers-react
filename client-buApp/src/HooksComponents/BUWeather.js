import React, { useState } from 'react'
import UserName from '../FuncComponents/UserName'
import BUNavBar from '../FuncComponents/BUNavBar'
import { postWCity } from '../JS/weatherData'
export default function BUWeather() {
  const [wData, setWData] = useState('')

  const handleSubmitInput = (e) => {
    e.preventDefault()
    console.log(`cityName ${wData}`)
    postWCity(wData)
  }
  return (
    <div>
      <BUNavBar />
      <div>BUWeather</div>
      <UserName />
      <div className='container'>
        <form onSubmit={handleSubmitInput} name='weather_form'>
          <label>City</label> <br />
          <input
            type='text'
            value={wData}
            required
            placeholder='Seattle'
            onChange={(e) => setWData(e.target.value)}
          />
          <button className='btn btn-primary mt-2' type='submit'>
            Info
          </button>
        </form>
      </div>
    </div>
  )
}
