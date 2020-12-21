//[AMN] We can write 'React.useContext' and 'React.useEffect' or only 'useContext' and 'useEffect' if you
// write import React, { useContext, useEffect } from 'react';

// useEffect what is doing is replacing componentDidMount, componentDidUpdate and tells React to use an 
// effect. Here we are checking if the episodes are empty and loading them by calling fetchDataAction().

import React from 'react';
import {Store} from './Store';
import {IAction, IEpisode} from './interfaces';

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
  
  // When there is an action to keep our favourites episodes it calls the reducer on 
  // Store.tsx that adds the favourite episode to the Store.
  // The boolean episodeInFav is true when the episode is whitin favourites or false
  // otherwise

  const toggleFavAction = (episode: IEpisode): IAction => { 
    const episodeInFav = state.favourites.includes(episode)
    let dispatchObj = {
      type: 'ADD_FAV',
      payload: episode
    }
    if (episodeInFav) {
      const favWithoutEpisode = state.favourites.filter((fav: IEpisode) => fav.id !== episode.id)
      console.log("Fav w/o: ", favWithoutEpisode)
      dispatchObj = {
        type: 'REMOVE_FAV',
        payload: favWithoutEpisode
      }
    }
    return dispatch(dispatchObj)
  }

  console.log(state)
  return (
    <React.Fragment> 
      <header className="header"> 
        <h1>Rick and Morty</h1>
        <p>Pick your favourite episode!!!</p>
        <p> Total favourites: { state.favourites.length }  </p>
      </header>
      
      <section className="episode-layout">
        {state.episodes.map((episode: IEpisode) => {
          return (
            <section key={episode.id} className="episode-box">
              <img src={episode.image.medium} alt={`Rick and Mort ${episode.name}`} />
              <div>{episode.name}</div>
              <section>
                <div>Session: {episode.season} Number: {episode.number}</div>
                <button type="button" onClick={() => toggleFavAction(episode)}>
                  {state.favourites.find((fav: IEpisode) => fav.id === episode.id) ? 'Unfav' : 'fav'}
                </button>
              </section>
            </section>  
          )
        })}
      </section>
    </React.Fragment>
  )
}
