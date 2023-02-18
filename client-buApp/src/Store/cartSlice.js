import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [{}],
  isAddedCart: false,
}

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, { ...action.payload }]
      state.isAddedCart = true
    },
    rmCFromart: (state) => {
      state.cartItems = [{}]
      state.isAddedCart = false
    },
  },
})

export const { addToCart, rmCFromart } = cartSlice.actions
export default cartSlice.reducer
