import React, { useState, useEffect } from 'react'
import UserName from '../FuncComponents/UserName'
import BUNavBar from '../FuncComponents/BUNavBar'
import { pairBLDevice } from '../JS/bluetoothData'

export default function BUAutomation() {
  const runPairProcess = () => pairBLDevice()
  return (
    <div>
      <BUNavBar />
      <div>Automation</div>
      <UserName />
      <div className='container'>
        <div className='text-info'>Pair Your Bluetooth Device</div>
        <button className='btn btn-primary' onClick={runPairProcess}>
          Connect
        </button>
      </div>
    </div>
  )
}
