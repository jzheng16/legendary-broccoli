"use client"

import { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";

export default function Chat({pusher_config}) {
    const [sender, setSender] = useState("");
    const [chatJoined, setChatJoined] = useState(false);
    const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState([]);
    const [members, setMembers] = useState({});
    const [pusher, setPusher] = useState(null);
    const [channel, setChannel] = useState({});
    const messagesScrollRef = useRef(null);

    useEffect(() => {
        messagesScrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        console.log(messageText);
        console.log('channel', channel);
        if(messageText.length > 0) {
            await fetch(`${pusher_config.endpoint}/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: messageText, sender, channel: channel.name, event: 'client-sendmessage' })
            }).then(response => {
                return response.json();
            }).then(data => {
                setMessageText("");
                console.log(data);
            });
        }
    };

    // When a user answers a question, what data needs to be sent to pusher?
    // Answer that they picked, User ID, What channel they're in, The type of event (ex: answer-clicked)

    const joinChat = () => {
        if(sender.length > 0) {
            const _pusher = new Pusher(pusher_config.key, {
                cluster: pusher_config.cluster,
                channelAuthorization: {
                    'endpoint': `${pusher_config.endpoint}/auth`,
                    params: {
                        user: sender
                    },
                    'transport': 'ajax'
                }
            });
            const _channel = _pusher.subscribe(pusher_config.channel);
            console.log('subscribing..')

            // This event only gets broadcasted from pusher for the current user ONLY
            _channel.bind("pusher:subscription_succeeded", () => {
                console.log("Joined Channel: ", _channel.members);
                setMembers(_channel.members.members);
            });

            _channel.bind("pusher:member_added", (member) => {
                console.log('member that was added', member)
                // console.log('member added', channel.members.members)
                setMembers(prevState => {
                    return {...prevState, [member.id]: member.info}
                });
            });

            _channel.bind("pusher:member_removed", (member) => {
                setMembers(prevState => {
                    delete prevState[member.id];
                    return { ...prevState }
                });
                console.log("Member removed: ", member);
            });



            _channel.bind("client-sendmessage", data => {
                setMessages((prevState) => [...prevState, { sender: data.sender, message: data.message }]);
                console.log("Message incoming... ", data);
            });
            setChannel(_channel);
            setPusher(_pusher);
            setChatJoined(true);
        }
    };

    const leaveChat = () => {
        pusher.unsubscribe(pusher_config.channel);
        setChatJoined(false);
        setPusher(null);
    }

    console.log('members list', members)

    return (
        <section>
            {chatJoined ?
                <div>
                    <h2>Members:</h2>
                    <ul className="bg-indigo-50 h-16 overflow-auto">
                        {Object.entries(members).map(([user_id, user_info]) =>  (
                            <li key={user_id} className="text-black">{user_info.name}</li>
                        ))}
                     
                    </ul>
                    <h2>Hi {sender},</h2>
                    <button type="button" onClick={leaveChat}>Leave</button>
                    <ul className="bg-gray-300 h-64 overflow-auto">
                        {messages.map((message, idx) => (
                            <li key={idx} className="text-green-600">
                                <span className="font-bold">{message.sender}: </span>
                                <span>{message.message}</span>
                            </li>
                        ))}
                        <li ref={messagesScrollRef}></li>
                    </ul>
                    <textarea className="text-black" onChange={(e) => setMessageText(e.target.value)} placeholder="Enter Message..." value={messageText}></textarea>
                    <button type="button" onClick={sendMessage}>Send</button>
                </div>
            :
                <div>
                    <input className="text-black" type="text" placeholder="Enter Name..." onChange={(e) => setSender(e.target.value)} />
                    <button type="button" onClick={joinChat}>Join</button>
                </div>
            }
        </section>
    )
} 