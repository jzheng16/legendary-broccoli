import Link from 'next/link'
import {Suspense} from 'react';
const fetchTodo = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return res.json();
}

export default async function UserPage({params}) {
  console.log('params in todo', params);

  const todo = await fetchTodo(params.id);

  console.log('todo', todo)
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <p>{todo.title}</p>
        <Link href={`/todos/${+params.id + 1}`}>Next post</Link>
    
      </Suspense>
    </main>
  )
}
