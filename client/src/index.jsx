import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importing App component
// import './index.css'; // Uncomment if you want CSS

const root = ReactDOM.createRoot(document.getElementById('root')); // Mounting point
root.render(
  <React.StrictMode>
    <App /> {/* Rendering App component */}
  </React.StrictMode>
);
