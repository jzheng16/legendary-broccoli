import Prompt from './components/Prompt'
import Chat from './components/Chat'
import Pusher from "pusher-js";

// const pusher = new Pusher(process.env.PUSHER_KEY, {
//   cluster: process.env.PUSHER_CLUSTER,
// });

export default function Home() {


  return (
    <main>
      <section className="w-9/12 ml-auto mr-auto p-8">

       <Prompt />
       <Chat  />
      </section>
    </main>
  )
}
