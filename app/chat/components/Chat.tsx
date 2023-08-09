"use client"

import { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";

export default function Chat({pusher_config}) {
    const [sender, setSender] = useState("");
    const [chatJoined, setChatJoined] = useState(false);
    const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesScrollRef = useRef(null);

    useEffect(() => {
        console.log(pusher_config);
        const pusher = new Pusher(pusher_config.key, {
            cluster: pusher_config.cluster,
            userAuthentication: {
                'endpoint': `${pusher_config.endpoint}/auth`,
                'transport': 'ajax'
            },
            channelAuthorization: {
                'endpoint': `${pusher_config.endpoint}/auth`,
                'transport': 'ajax'
            }
        });
        const channel = pusher.subscribe(pusher_config.channel);

        channel.bind("pusher:subscription_succeeded", () => {
            console.log("User joined: ", channel.members);
        });

        channel.bind("pusher:member_added", (member) => {
            console.log("Member add: ", member);
        });

        channel.bind("pusher:member_removed", (member) => {
            console.log("Member removed: ", member);
        });

        channel.bind(pusher_config.event, data => {
            setMessages((prevState) => [...prevState, { sender: data.sender, message: data.message }]);
            console.log("show me data: ", data);
        });

        return () => {
            pusher.unsubscribe(pusher_config.channel);
        }
    }, []);

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
        setChatJoined(true);
    };

    const leaveChat = () => {
        setChatJoined(false);
    }

    return (
        <section>
            {chatJoined ?
                <div>
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