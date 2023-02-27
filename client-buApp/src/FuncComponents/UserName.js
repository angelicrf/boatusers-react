import React from 'react'
import { useSelector } from 'react-redux'

const UserName = () => {
  const isGLoggedIn = useSelector((state) => state.userReducer.isGLoggedIn)
  const isULoggedIn = useSelector((state) => state.userReducer.isLoggedIn)
  const getUserName = isULoggedIn
    ? useSelector((state) => state.userReducer.user.name)
    : isGLoggedIn
    ? useSelector((state) => state.userReducer.gUser.gName)
    : null

  return (
    <div>
      <div>
        {getUserName ? (
          <div>
            Welcome <span className='text-danger'>{getUserName}</span> to
            BoatUsers App
          </div>
        ) : null}
      </div>
    </div>
  )
}
//
//
export default UserName
