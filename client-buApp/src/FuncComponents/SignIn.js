import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from '../Store/userSclice'
import React from 'react'

export default function SignIn() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const signin = (e) => {
    e.preventDefault()
    dispatch(signIn({ name, email }))
  }

  return (
    <div className='container'>
      <div className='bg-light'>
        <h1>Sign In</h1>
        <form onSubmit={signin} name='signin_form'>
          <label>Name</label> <br />
          <input
            type='text'
            value={name}
            required
            placeholder='Enter your name'
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email</label>
          <br />
          <input
            type='email'
            value={email}
            required
            placeholder='Enter your email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type='submit'>Sign in</button>
        </form>
      </div>
    </div>
  )
}
