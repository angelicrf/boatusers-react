import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from '../Store/userSlice'
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
    <div
      style={{ width: '400px' }}
      className='container bg-info rounded px-2 py-2 d-flex justify-content-center mt-4'
    >
      <div>
        <form onSubmit={signin} name='signin_form'>
          <label>Name</label> <br />
          <div>
            <input
              type='text'
              value={name}
              required
              placeholder='Enter your name'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <label>Email</label>
          <div>
            <input
              type='email'
              value={email}
              required
              placeholder='Enter your email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className='btn btn-primary mb-2 mt-2' type='submit'>
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
