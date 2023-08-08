import Link from 'next/link'
import {Suspense} from 'react';
import { notFound } from 'next/navigation';
const fetchTodo = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}

interface Param {
  id: string;
}




export default async function UserPage({params}: {params: Param} ) {
  console.log('params in todo', params);
  const todo: Todo = await fetchTodo(params.id);
  if (!todo) {
    console.log('hit')
    notFound();
  }



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
