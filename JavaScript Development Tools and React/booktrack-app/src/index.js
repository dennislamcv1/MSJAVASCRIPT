import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import './variables.css'; // New import
import './App.css';       // New import (or ensure it's the updated one)
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);