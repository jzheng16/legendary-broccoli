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
    const messagesScrollRef = useRef(null);

    useEffect(() => {
        messagesScrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        console.log(messageText);
        if(messageText.length > 0) {
            await fetch(`${pusher_config.endpoint}/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: messageText, sender })
            }).then(response => {
                return response.json();
            }).then(data => {
                setMessageText("");
                console.log(data);
            });
        }
    };

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
            const channel = _pusher.subscribe(pusher_config.channel);
            console.log('subscribing..')

            channel.bind("pusher:subscription_succeeded", () => {
                console.log("Joined Channel: ", channel.members);
                setMembers(channel.members.members);
            });

            channel.bind("pusher:member_added", (member) => {
                console.log('ALL MEMBERS IN MEMBER ADDED', channel.members);
                console.log("Member add: ", member);
            });

            channel.bind("pusher:member_removed", (member) => {
                console.log("Member removed: ", member);
            });

            channel.bind(pusher_config.event, data => {
                setMessages((prevState) => [...prevState, { sender: data.sender, message: data.message }]);
                console.log("show me data: ", data);
            });
            setPusher(_pusher);
            setChatJoined(true);
        }
    };

    const leaveChat = () => {
        pusher.unsubscribe(pusher_config.channel);
        setChatJoined(false);
        setPusher(null);
    }

    return (
        <section>
            {chatJoined ?
                <div>
                    <h2>Members:</h2>
                    <ul className="bg-indigo-50 h-16 overflow-auto">
                        <li className="bg-green-100">{sender}</li>
                        {Object.entries(members).map(([user_id, user_info]) =>  (
                            <li key={user_id}>{user_info.name}</li>
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
                    <textarea onChange={(e) => setMessageText(e.target.value)} placeholder="Enter Message..." value={messageText}></textarea>
                    <button type="button" onClick={sendMessage}>Send</button>
                </div>
            :
                <div>
                    <input type="text" placeholder="Enter Name..." onChange={(e) => setSender(e.target.value)} />
                    <button type="button" onClick={joinChat}>Join</button>
                </div>
            }
        </section>
    )
} 