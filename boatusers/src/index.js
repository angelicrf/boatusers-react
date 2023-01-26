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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/About' element={<About />} />
        <Route path='/Home' element={<App />} />
        <Route path='/Items' element={<BUItems />} />
        <Route path='/Map' element={<BUMap />} />
        <Route path='/Weather' element={<BUWeather />} />
        <Route path='/Automation' element={<BUAutomation />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
