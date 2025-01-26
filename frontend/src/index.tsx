import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainComponent from './components/MainComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MainComponent />
  </React.StrictMode>
);

