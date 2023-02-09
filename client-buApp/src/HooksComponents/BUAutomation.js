import React, { useState, useEffect } from 'react'
import UserName from '../FuncComponents/UserName'
import BUNavBar from '../FuncComponents/BUNavBar'

export default function BUAutomation() {
  return (
    <div>
      <UserName />
      <div>Automation</div>
      <BUNavBar />
    </div>
  )
}
