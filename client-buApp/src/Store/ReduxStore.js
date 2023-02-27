import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import favReducer from './favSlice'
import cartReducer from './cartSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
}
const multipleReducers = combineReducers({
  userReducer,
  favReducer,
  cartReducer,
})
const persistedReducer = persistReducer(persistConfig, multipleReducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export const persistor = persistStore(store)
