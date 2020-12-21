//[AMN] We can write 'React.useContext' and 'React.useEffect' or only 'useContext' and 'useEffect' if you
// write import React, { useContext, useEffect } from 'react';

// useEffect what is doing is replacing componentDidMount, componentDidUpdate and tells React to use an 
// effect. Here we are checking if the episodes are empty and loading them by calling fetchDataAction().

import React, { Component } from 'react';
import {Store} from './Store';

//[AMN] As React.createContext in Store.tsx defined Store as the object with the State
// now we can take the object Store and use it in any components encapsulated within
// StoreProvider (in this case all descendants from index.tsx)
export default function App():JSX.Element {
  const {state, dispatch} = React.useContext(Store)

  //[AMN] When the app uploads checks whether there's anything inside the episodes (first time there is NOT).
  // then executes fetchDataAction() and takes all the episodes from the API.
  React.useEffect(() => {
    if (state.episodes.length === 0) { // This is the same that line commented below (the teacher wrote line below)
      fetchDataAction()
    }
    // state.episodes.length === 0 && fetchDataAction()
  })

  const fetchDataAction = async() => {
    const URL = 'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes'
    const data = await fetch(URL)
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    })
  }

  return (
    <React.Fragment> 
      <h1>Rick and Morty</h1>
      <p>Pick your favourite episode!!!</p>
      <section>
        {state.episodes.map((episode: any) => {
          return (
            <section key={episode.id}>
              <img src={episode.image.medium} alt={`Rick and Mort ${episode.name}`} />
              <div>{episode.name}</div>
              <section>
                Session: {episode.season} Number: {episode.number}
              </section>
            </section>  
          )
        })}
      </section>
    </React.Fragment>
  )
}
