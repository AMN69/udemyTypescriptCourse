//[AMN] We can write 'React.useContext' and 'React.useEffect' or only 'useContext' and 'useEffect' if you
// write import React, { useContext, useEffect } from 'react';

// useEffect what is doing is replacing componentDidMount, componentDidUpdate and tells React to use an 
// effect. Here we are checking if the episodes are empty and loading them by calling fetchDataAction().

import React from 'react';
import {Store} from './Store';
import {Link} from '@reach/router';

//[AMN] As React.createContext in Store.tsx defined Store as the object with the State
// now we can take the object Store and use it in any components encapsulated within
// StoreProvider (in this case all descendants from index.tsx)
export default function App(props: any):JSX.Element {
  const {state } = React.useContext(Store)

  return (
    <React.Fragment> 
      <header className="header"> 
        <div>
          <h1>Rick and Morty</h1>
          <p>Pick your favourite episode!!!</p>
        </div>
        <div>
          <Link to='/'>Home</Link>
          <Link to='/faves'>Favourite(s): { state.favourites.length }</Link>
        </div>
      </header>
      {props.children}
    </React.Fragment>
  )
}
