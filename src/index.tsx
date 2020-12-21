import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {StoreProvider} from './Store';

//[AMN] By encapsulating App within StoreProvider all the components of this app will
// be able to use the State that is stored in the const "Store" in Store.tsx
ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>, 
  document.getElementById('root'));

