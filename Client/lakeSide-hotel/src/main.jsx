import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import { hotelSystem } from './components/common/Redux/store'; // Import the store
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={hotelSystem}>
      <App />
    </Provider>
  </React.StrictMode>,
);
