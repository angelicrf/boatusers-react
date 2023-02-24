import React from 'react'
import BUNavBar from '../FuncComponents/BUNavBar'
import UserName from '../FuncComponents/UserName'
import GoogleCreds from './GoogleCreds'

const UserInfo = () => {
  return (
    <div>
      <header>
        <title>UserInfo</title>
      </header>
      <BUNavBar />
      <div>UserInfo</div>
      <UserName />
      <GoogleCreds />
    </div>
  )
}

export default UserInfo
