'use client'

import {useState, useEffect} from 'react';

const ClientComponent = () => {

  const [todos, setTodos] = useState([]);
 
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos`)
      .then(res => res.json())
      .then(_todos => setTodos(_todos));
  }, []);

  console.log('todos', todos);

  return (
    <div>
      <div>Hello World</div>
      <button onClick={() => setTodos(todos.slice(0, todos.length - 2))}>Delete todo</button>

    </div>
  )
}

export default ClientComponent;