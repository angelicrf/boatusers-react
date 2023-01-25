import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import About from './About'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <About />
  </React.StrictMode>
);

reportWebVitals();
