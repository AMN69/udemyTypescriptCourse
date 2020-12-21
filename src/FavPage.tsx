import React from 'react'
import { IEpisodesProps } from './interfaces';
import {Store} from './Store';
import {toggleFavAction} from './Actions'

const EpisodeList = React.lazy<any>(() => import('./EpisodesList')) 
export default function FavPage(): JSX.Element {
    const {state, dispatch} = React.useContext(Store)

    const props: IEpisodesProps = {
        episodes: state.favourites,
        store: {state, dispatch},
        toggleFavAction,
        favourites: state.favourites
    }

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <div className="episode-layout">
                <EpisodeList {...props} />
            </div>
        </React.Suspense>
    )
}
