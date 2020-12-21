import React from 'react';
import {Store} from './Store';
import {IEpisodesProps} from './interfaces';
import {fetchDataAction, toggleFavAction} from './Actions'


export default function HomePage() {
  const {state, dispatch} = React.useContext(Store)

  //[AMN] We are importing a part of the code needed here but that is in another 
  // file (EpisodesList.tsx). This is more for big apps to avoid loading all the code
  // and making the app load code not needed that slow down the performance.
  // React.lazy needs a React.Suspense (see below) to work.

  const EpisodeList = React.lazy<any>(() => import('./EpisodesList')) 
    
  //[AMN] When the app uploads checks whether there's anything inside the episodes (first time there is NOT).
  // then executes fetchDataAction() and takes all the episodes from the API.
  React.useEffect(() => {
    if (state.episodes.length === 0) { // This is the same that line commented below (the teacher wrote line below)
      fetchDataAction(dispatch)
    }
    // state.episodes.length === 0 && fetchDataAction()
  })

  const props: IEpisodesProps = {
    episodes: state.episodes,
    store: {state, dispatch},
    toggleFavAction,
    favourites: state.favourites
  }
  return (
      <React.Fragment>
        <React.Suspense fallback={<div>Loading...</div>}>
            <section className="episode-layout">
                <EpisodeList {...props} />
            </section>
        </React.Suspense>
    </React.Fragment>
  )
}


