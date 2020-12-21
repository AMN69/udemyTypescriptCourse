import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {StoreProvider} from './Store';
import {Router, RouteComponentProps} from '@reach/router';

import HomePage from './HomePage';
import FavPage from './FavPage';

const RouterPage = (props: {pageComponent: JSX.Element} & RouteComponentProps) => props.pageComponent
//[AMN] By encapsulating App within StoreProvider all the components of this app will
// be able to use the State that is stored in the const "Store" in Store.tsx
ReactDOM.render(
  <StoreProvider>
    <Router>
      <App path='/'>
        <RouterPage pageComponent={<HomePage />} path='/' />
        <RouterPage pageComponent={<FavPage />} path='/faves' />
      </App>
    </Router>
  </StoreProvider>, 
  document.getElementById('root'));

