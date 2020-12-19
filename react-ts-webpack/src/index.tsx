import React, {Fragment, useState } from 'react'
import reactDOM from 'react-dom'

//[AMN] With type you can define a new type of element that is not a number nor string nor any existing type
// you are defining a new invented type. In this case FormElem is an element of type React.FormEvent<HTMLFormElement>
type FormElem = React.FormEvent<HTMLFormElement>

//[AMN] The interface is used to define a 'contract within your code' and in this case an object that has 
// to have a text string and a complete boolean is defined. 
interface ITodo {
    text: string
    complete: boolean
}

//[AMN] Here we are using setState with Typescript. On the one hand we have the useState hook that initializes
// a value using the function setValue. On the other hand we have the '<string>' that is used by Typescript
// to know that we must use a string and avoid javascript to swallow a non-string value.
export default function App(): JSX.Element {
    const [value, setValue] = useState<string>('')
    const [todos, setTodos] = useState<ITodo[]>([])

    const handleSubmit = (e: FormElem) => {
        e.preventDefault() // [AMN] Avoids refreshing the page.
        addTodo(value)
        setValue('')
    }

    const addTodo = (text: string):void => {
        const newTodos: ITodo[] = [... todos, {text, complete: false}]
        setTodos(newTodos)
    }

    const completeTodo = (index: number):void => {
        const newTodos: ITodo[] = [...todos]
        newTodos[index].complete = !newTodos[index].complete
        setTodos(newTodos)
    }

    const removeTodo = (index: number): void => {
        const newTodos: ITodo[] = [...todos]
        newTodos.splice(index, 1)
        setTodos(newTodos)
    }
    
    return (
        <Fragment>
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={value} onChange={e => setValue(e.target.value)} required />
                <button type="submit">Add Todo</button>
            </form>
            <section>
                {todos.map((todo: ITodo, index: number) => (
                    <Fragment key={index}>
                     <div style={{ textDecoration: todo.complete ? 'line-through' : ''}}>{todo.text}</div>
                     <button type='button' onClick={():void => completeTodo(index)}> 
                        {' '}
                        {todo.complete ? 'Incomplete' : 'Complete'}{' '}
                     </button>
                     <button type='button' onClick={():void => removeTodo(index)}> Remove
                     </button>
                    </Fragment>
                 ))}
            </section>
        </Fragment>
    )
}

const root = document.getElementById('app-root')

reactDOM.render(<App />, root)

