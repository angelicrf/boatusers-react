import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  gUser: {},
  isGLoggedIn: false,
  isLoggedIn: false,
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      state.isLoggedIn = true
    },
    signOut: (state) => {
      state.user = {}
      state.isLoggedIn = false
    },
    gSignIn: (state, action) => {
      state.gUser = { ...state.gUser, ...action.payload }
      state.isGLoggedIn = true
    },
    gSignOut: (state) => {
      state.gUser = {}
      state.isGLoggedIn = false
    },
  },
})

export const { signIn, signOut, gSignIn, gSignOut } = userSlice.actions
export default userSlice.reducer
