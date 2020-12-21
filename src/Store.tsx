import React from 'react';

//[AMN] Typescript defining an interface as a 'contract'.
interface IState {
    episodes: [],
    favourites: []
}

interface IAction {
    type: string,
    payload: any
}

//[AMN] React defining the State whose structure is the interface defined above.
const initialState: IState = {
    episodes: [],
    favourites: []
}

//[AMN] Context allows you to pass data through the components tree w/o having to pass
// props manually to each level.
export const Store = React.createContext<IState | any>(initialState)

// [AMN] The reducer is what we are going to use to change the Store.
function reducer(state: IState, action: IAction): IState {
    switch (action.type) {
        case 'FETCH_DATA':
            return { ...state, episodes: action.payload}
        default:
            return state
    }
}

//[AMN] StoreProvider has a prop = initialState that is going to be passed to the 
// components consumers descendants from Provider. Each time the initialState chenges
// the descendants components will be rendered. 
export function StoreProvider(props: any): JSX.Element {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
}