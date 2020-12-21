// All the interfaces

export type Dispatch = React.Dispatch<IAction>

//[AMN] Typescript defining an interface as a 'contract'.
export interface IState {
    episodes: Array<IEpisode>,
    favourites: Array<IEpisode>
}

export interface IAction {
    type: string,
    payload: Array<IEpisode> | any
}

export interface IEpisode {
    airdate: string
    airstamp: string
    airtime: string
    id: number
    image: {medium: string, original: string}
    name: string
    number: number
    runtime: number
    season: number
    summary: string
    type: string
    url: string
}

export interface IEpisodesProps {
    episodes: Array<IEpisode>
    store: {state: IState, dispatch: Dispatch},
    toggleFavAction: (state: IState, dispatch: any, episode: IEpisode) => IAction
    favourites: Array<IEpisode>
}