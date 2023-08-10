import Chat from './components/Chat'
const PUSHER_CONFIG = {
    endpoint: process.env.PUSHER_ENDPOINT,
    cluster: process.env.PUSHER_CLUSTER,
    key: process.env.PUSHER_KEY,
    channel: "presence-kyongsucks",
    event: "client-balls"
};

export default function ChatPage() {
    return (
        <main>
            <h1>Let's Chat</h1>
            <Chat pusher_config={PUSHER_CONFIG} />
        </main>
    )
}