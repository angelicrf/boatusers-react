import React, { useState, useMemo } from 'react'
import UserName from '../FuncComponents/UserName'
import BUNavBar from '../FuncComponents/BUNavBar'

export default function BUWeather() {
  return (
    <div>
      <BUNavBar />
      <div>BUWeather</div>
      <UserName />
    </div>
  )
}
