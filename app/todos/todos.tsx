'use client'
import {Suspense, useEffect, useState} from 'react';


export default function UserPage({params}) {

  const [todos, setTodos] = useState([]);

  useEffect(() => {


  fetch(`https://jsonplaceholder.typicode.com/todos`)
    .then(res => 
      {
        console.log('where am i');
        return res.json()
      })
    .then (_todos => setTodos(_todos))
  }, [])

  const deleteTodo = (id) => {
    // Delete off backend (make API request)
    setTodos(todos.filter(todo => todo.id !== id));
  }

  

  return (
    
      <Suspense fallback={<div>Loading...</div>}>
        {todos.map(todo => {
          return (
            <div key={todo.id}style={{display: 'flex'}}>
              <p>{todo.title}</p>
              <button onClick={() => deleteTodo(todo.id)}>Delete Todo</button>
            </div>
          )
        })}
      </Suspense>
    
  )
}
