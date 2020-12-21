import {IAction, IEpisode, IState} from './interfaces';

export const fetchDataAction = async(dispatch: any) => {
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

export const toggleFavAction = (state:IState, dispatch:any, episode: IEpisode | any): IAction => { 
    const episodeInFav = state.favourites.includes(episode)
    let dispatchObj = {
        type: 'ADD_FAV',
        payload: episode
    }
    if (episodeInFav) {
        const favWithoutEpisode = state.favourites.filter((fav: IEpisode) => fav.id !== episode.id)
        dispatchObj = {
            type: 'REMOVE_FAV',
            payload: favWithoutEpisode
        }
}

return dispatch(dispatchObj)
}
