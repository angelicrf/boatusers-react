import React, { useEffect, useState } from 'react'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { useDispatch, useSelector } from 'react-redux'
import { gSignIn, gSignOut } from '../Store/userSlice'

const GoogleCreds = () => {
  //735335572118-6bu3j8ut621nqtidecgabeer20pnrl6r.apps.googleusercontent.com client id
  //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    client secret
  const [user, setUser] = useState([])
  const [existAT, setExistAT] = useState(false)
  const [gAccessToken, setGAccessToken] = useState('')
  const isGLoggedIn = useSelector((state) => state.userReducer.isGLoggedIn)
  const gUserInfo = useSelector((state) => state.userReducer.gUser)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isGLoggedIn && !existAT) {
      setExistAT(true)
    } else {
      if (gAccessToken) {
        console.log('isAccessTokenfromUseEffect')
        setExistAT(false)
        getUserInfo(gAccessToken)
      }
    }
  }, [gAccessToken])

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setGAccessToken(codeResponse.access_token),
    onError: (error) => console.log('Login Failed:', error),
  })
  const logOut = () => {
    googleLogout()
    dispatch(gSignOut({}))
  }

  const getUserInfo = (thisAccessToken) => {
    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${thisAccessToken}`)

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }
    try {
      fetch('https://www.googleapis.com/oauth2/v1/userinfo', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          if (!result.error) {
            console.log(result)
            dispatch(
              gSignIn({
                gName: result.name,
                gEmail: result.email,
                gImg: result.picture,
                gId: result.id,
              }),
            )
          } else {
            console.log('errorLoding')
          }
        })
        .catch((error) => {
          console.log('errorMain', error)
        })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      {isGLoggedIn && gUserInfo.gId !== undefined ? (
        <div className='container bg-info rounded'>
          <div className='mt-2'>user Profile ID: {gUserInfo.gId}</div>
          <img
            className='rounded mt-2 mb-2'
            src={gUserInfo.gImg}
            alt='user image'
          />
          <p>Name: {gUserInfo.gName}</p>
          <p>Email Address: {gUserInfo.gEmail}</p>
          <button className='btn btn-danger mb-2' onClick={logOut}>
            Log out
          </button>
        </div>
      ) : (
        <div className='container px-2 py-2 d-flex justify-content-center'>
          <button
            style={{ width: '400px' }}
            className='btn btn-primary'
            onClick={() => (existAT ? login() : null)}
          >
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  )
}

export default GoogleCreds
