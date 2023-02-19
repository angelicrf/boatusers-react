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
    rmFromCart: (state, action) => {
      //work on delete
      state.cartItems = state.cartItems.filter((dt) =>
        dt.thisPrId !== action.payload.thisPrId ? dt : null,
      )
      state.isAddedCart = false
    },
    updateFromCart: (state, action) => {
      // work on update
      state.cartItems = [
        state.cartItems.map((p) =>
          p.thisPrId === action.payload.thisPrId
            ? (p.thisPrId = action.payload.thisPrQuantity)
            : null,
        ),
        { ...action.payload },
      ]
      state.isAddedCart = true
    },
  },
})

export const { addToCart, rmFromCart, updateFromCart } = cartSlice.actions
export default cartSlice.reducer
