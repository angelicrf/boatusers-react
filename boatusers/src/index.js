import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './FuncComponents/App';
import About from './FuncComponents/About'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import BUWeather from './HooksComponents/BUWeather';
import BUItems from './HooksComponents/BUItems';
import BUAutomation from './HooksComponents/BUAutomation';
import BUMap from './HooksComponents/BUMap';
import { persistor, store } from '../src/Store/ReduxStore';
import { PersistGate } from 'redux-persist/integration/react';
import { useSelector, Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(

  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/About' element={<About />} />
            <Route path='/Home' element={<App />} />
            <Route path='/Items' element={<BUItems />} />
            <Route path='/Map' element={<BUMap />} />
            <Route path='/Weather' element={<BUWeather name="Default" />} />
            <Route path='/Automation' element={<BUAutomation />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
