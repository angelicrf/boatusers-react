import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSclice";
import favReducer from './favSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux'
import thunk from 'redux-thunk';


const persistConfig = {
    key: 'root',
    storage,
}
const multipleReducers = combineReducers({
    userReducer,
    favReducer
})
const persistedReducer = persistReducer(persistConfig, multipleReducers)
//const favsPReducer = persistReducer(persistConfig, favReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})
/* export const favStore = configureStore({
    reducer: favsPReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
}) */

export const persistor = persistStore(store)
//export const favPersistor = persistStore(favStore)