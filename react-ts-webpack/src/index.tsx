import React from 'react'
import reactDOM from 'react-dom'

export default function App(): JSX.Element {
    const sum = (a:number, b:number): number => {
        return a + b;
    }
    return (
        <h1>
           Hello!! {sum(15,15)}
        </h1>
    )
}

const root = document.getElementById('app-root')

reactDOM.render(<App />, root)