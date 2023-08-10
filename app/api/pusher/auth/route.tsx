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
  const user = searchParams.get('user');
  // const presence_data = {
  //   user: user
  // }
  
   const presence_data = {
    user_id: user,
    user_info: { name: user, twitter_id: "@pusher" + user },
  };
  
  // const {socket_id, channel_name} = await request.json();
  console.log('socket id', socket_id, channel_name);
  console.log('USERAAAAAAA: ', user);

  const authResponse = pusher.authorizeChannel(socket_id, channel_name, presence_data);
  console.log('auth response', authResponse);

  return NextResponse.json(authResponse);
  // return 1;
}


