import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainComponent from './components/MainComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//Todo: change this so it checks what the user prefference is, this is to not flashbang the user
document.body.classList.add("dark-theme")

root.render(
  <React.StrictMode>
    <MainComponent />
  </React.StrictMode>
);

