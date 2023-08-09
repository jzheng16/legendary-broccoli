import Prompt from './components/Prompt'
import Chat from './components/Chat'
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { useSession } from "next-auth/react"
import Link from 'next/link';

export default async function Home(props) {
  const session = await getServerSession(authOptions)
  console.log('session', session);

  if (!session) {
    return (
      <main>
        <button>
          <Link href="/api/auth/signin">Sign In</Link>
        </button>
      </main>

    )
  }

  return (
    <main>
      <section className="w-9/12 ml-auto mr-auto p-8">
        <Prompt />
        <Chat />
      </section>
    </main>
  )
}
