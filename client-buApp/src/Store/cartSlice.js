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
      let keepNotRemoved = []
      state.cartItems.map((fr, index) => {
        if (fr.thisPrId === action.payload.thisPrId) {
          console.log(`beforeFr ${fr.thisPrId}  `, index)
          state.cartItems.splice(index, 1)
        } else keepNotRemoved.push(fr)
      })
      console.log('keepNotRemoved ', keepNotRemoved[0].thisPrId)
      ;(state.cartItems = state.cartItems), (state.isAddedCart = true)
    },
    updateFromCart: (state, action) => {
      ;(state.cartItems = [
        state.cartItems
          .filter(function (item, index) {
            return item.thisPrId !== action.payload.thisPrId
              ? item.thisPrId
              : null
          })
          .map(
            (elem, index, arr) =>
              index === arr.findIndex((t) => t.thisPrId === elem.thisPrId),
          ),
        { ...action.payload },
      ]),
        (state.isAddedCart = true)
    },
  },
})

export const { addToCart, rmFromCart, updateFromCart } = cartSlice.actions
export default cartSlice.reducer
