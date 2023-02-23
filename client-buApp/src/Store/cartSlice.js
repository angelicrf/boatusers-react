import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [{}],
  favsProducts: [{}],
  savedLaterProducts: [{}],
  isAddedCart: false,
}
const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    saveProducts: (state, action) => {
      state.savedLaterProducts = [
        ...state.savedLaterProducts,
        { ...action.payload },
      ]
    },
    rmFromSaved: (state, action) => {
      let keepNotRemoved = []
      state.savedLaterProducts.map((fr, index) => {
        if (fr.thisPrId === action.payload.thisPrId) {
          console.log(`beforeFr ${fr.thisPrId}  `, index)
          state.savedLaterProducts.splice(index, 1)
        } else keepNotRemoved.push(fr)
      })
      state.savedLaterProducts = state.savedLaterProducts
    },
    favsProductsItems: (state, action) => {
      state.favsProducts = [...state.favsProducts, { ...action.payload }]
    },
    rmFromFavs: (state, action) => {
      let keepNotRemoved = []
      state.favsProducts.map((fr, index) => {
        if (fr.thisPrId === action.payload.thisPrId) {
          console.log(`beforeFr ${fr.thisPrId}  `, index)
          state.favsProducts.splice(index, 1)
        } else keepNotRemoved.push(fr)
      })
      state.favsProducts = state.favsProducts
    },
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
      ;(state.cartItems = state.cartItems),
        (state.isAddedCart = state.cartItems.length > 0 ? true : false)
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

export const {
  addToCart,
  rmFromCart,
  updateFromCart,
  favsProductsItems,
  saveProducts,
  rmFromFavs,
  rmFromSaved,
} = cartSlice.actions
export default cartSlice.reducer
