import { NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export async function POST(request: Request) {
  // console.log('request', request);
  const x = await request.text();
  console.log('request', x);
  const searchParams = new URLSearchParams(x);
  const socket_id = searchParams.get('socket_id');
  const channel_name = searchParams.get('channel_name');
  // const {socket_id, channel_name} = await request.json();
  console.log('socket id', socket_id, channel_name);

  // const user = {
  //   id: 1,
  //   user_info: {
  //     name: "Joey"
  //   },
  //   watchlist: ['another_id_1']
  // }
  
  const authResponse = pusher.authorizeChannel(socket_id, channel_name)

  return NextResponse.json(authResponse);
  // return 1;
}


