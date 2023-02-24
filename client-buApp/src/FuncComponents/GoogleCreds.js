import React, { useEffect, useState } from 'react'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { signIn } from '../Store/userSclice'

const GoogleCreds = () => {
  //735335572118-6bu3j8ut621nqtidecgabeer20pnrl6r.apps.googleusercontent.com client id
  //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    client secret
  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])
  const [existAT, setExistAT] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    let getAccessToken = localStorage.getItem('userAccessToken')
    console.log(getAccessToken)
    if (getAccessToken == null) {
      setExistAT(true)
    } else {
      setExistAT(false)
      getUserInfo(getAccessToken)
    }
  }, [user])

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      localStorage.setItem('userAccessToken', codeResponse.access_token)
      if (localStorage.getItem('userAccessToken') !== null) {
        setUser(codeResponse)
      }
    },
    onError: (error) => console.log('Login Failed:', error),
  })
  const logOut = () => {
    googleLogout()
    localStorage.removeItem('userAccessToken')
    setProfile(null)
  }

  const getUserInfo = (thisAccessToken) => {
    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${thisAccessToken}`)

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }

    fetch('https://www.googleapis.com/oauth2/v1/userinfo', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        dispatch(signIn({ name: result.name, email: result.email }))
        setProfile(result)
      })
      .catch((error) => console.log('error', error))
  }
  return (
    <div>
      {profile && profile.id !== undefined ? (
        <div className='container bg-info rounded'>
          <div className='mt-2'>user Profile ID: {profile.id}</div>
          <img
            className='rounded mt-2 mb-2'
            src={profile.picture}
            alt='user image'
          />
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
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
