import React from 'react'
import { useSelector } from 'react-redux'

const UserName = () => {

  const getUserName = useSelector(state => state.userReducer.user.name)

  return (
    <div>
      <div>Welcome <span className="text-danger">{getUserName}</span> to BoatUsers App</div>
    </div>
  )
}

export default UserName
