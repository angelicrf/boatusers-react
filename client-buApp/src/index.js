import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './FuncComponents/App'
import About from './FuncComponents/About'
import UserInfo from './FuncComponents/UserInfo'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import BUWeather from './HooksComponents/BUWeather'
import BUItems from './HooksComponents/BUItems'
import BUAutomation from './HooksComponents/BUAutomation'
import BUMap from './HooksComponents/BUMap'
import { persistor, store } from '../src/Store/ReduxStore'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import ContextProvider from './Store/ContextProvider'
import MarkerInfo from './HooksComponents/MarkerInfo'
import FavoritedPlaces from './FuncComponents/FavoritedPlaces'
import { BUProducts } from './FuncComponents/BUProducts'
import BUCart from './FuncComponents/BUCart'
import FavoriteProducts from './FuncComponents/FavoriteProducts'
import SavedProducts from './FuncComponents/SavedProducts'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <>
    <GoogleOAuthProvider clientId='735335572118-6bu3j8ut621nqtidecgabeer20pnrl6r.apps.googleusercontent.com'>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<App />} />
                <Route path='/Map' element={<BUMap />} />
                <Route path='/About' element={<About />} />
                <Route path='/Home' element={<App />} />
                <Route path='/Items' element={<BUItems />} />
                <Route path='/Weather' element={<BUWeather />} />
                <Route path='/Automation' element={<BUAutomation />} />
                <Route path='/MapLocInfo' element={<MarkerInfo />} />
                <Route path='/MyAccount' element={<UserInfo />} />
                <Route path='/Products' element={<BUProducts />} />
                <Route path='/Cart' element={<BUCart />} />
                <Route
                  path='/MyAccount/FavoritePlaces'
                  element={<FavoritedPlaces />}
                />
                <Route
                  path='/MyAccount/FavoriteProducts'
                  element={<FavoriteProducts />}
                />
                <Route
                  path='/MyAccount/SavedProducts'
                  element={<SavedProducts />}
                />
              </Routes>
            </BrowserRouter>
          </ContextProvider>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </>,
)

reportWebVitals()
