import BUNavBar from '../FuncComponents/BUNavBar'
import UserName from '../FuncComponents/UserName'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SignIn from './SignIn'
import GoogleCreds from './GoogleCreds'

export default function App() {
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn)
  //const [isGLoggedIn, setIsGLoggedIn] = useState(false)
  const isGLoggedIn = useSelector((state) => state.userReducer.isGLoggedIn)
  /*  useEffect(() => {
    document.body.style.background = '#dae8ee'
    console.log('runLoggIn')

    let getUserInfo = localStorage.getItem('userAccessToken')
    if (getUserInfo !== null) {
      setIsGLoggedIn(true)
    }
  }, []) */

  return isLoggedIn || isGLoggedIn ? (
    <div>
      <header>
        <title>BoatUser</title>
      </header>
      <BUNavBar />
      <UserName />
    </div>
  ) : (
    <>
      <SignIn />
      <GoogleCreds />
    </>
  )
}
