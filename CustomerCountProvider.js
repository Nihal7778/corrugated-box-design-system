import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { CustomerCountProvider } from './CustomerCountContext';

ReactDOM.render(
  <React.StrictMode>
    <CustomerCountProvider>
      <Router>
        <App />
      </Router>
    </CustomerCountProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
