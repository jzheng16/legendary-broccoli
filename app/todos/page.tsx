import Link from 'next/link'
import {Suspense} from 'react';
import Todos from './todos';


export default async function UserPage({params}) {

  return (
    <main>
      <h1 className="text-3xl font-bold underline">Todos for User</h1>
      <Todos /> 
     
    </main>
  )
}
