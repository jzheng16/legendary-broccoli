import { NextRequest, NextResponse } from 'next/server'
import Pusher from 'pusher';

export const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
});

export async function POST(req: NextRequest) {
    const { sender, message, channel, event } = await req.json();
    console.log(sender, message);
    const response = await pusher.trigger(channel, event, {
        message,
        sender,
    });

    return NextResponse.json({ message: "completed" });
}