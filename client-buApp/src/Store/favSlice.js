import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favPlaces: {},
    isFavorited: false,
}

const favSlice = createSlice({
    name: 'favSlice',
    initialState,
    reducers: {
        addFavs: (state, action) => {
            state.favPlaces = { ...state.favPlaces, ...action.payload }
            state.isFavorited = true
        },
        rmFavs: (state) => {
            state.favPlaces = {}
            state.isFavorited = false
        }
    }
})

export const { addFavs, rmFavs } = favSlice.actions
export default favSlice.reducer