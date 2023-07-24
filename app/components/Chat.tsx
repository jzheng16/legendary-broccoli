"use client"

import {useEffect, useState} from 'react';
import Pusher from "pusher-js";

const pusher = new Pusher('3acde910e0f4cf3eeab4', {
  cluster: 'us2',
  userAuthentication: {
    'endpoint': 'http://localhost:3000/api/pusher/auth',
    'transport': 'ajax'
  },
  channelAuthorization: {
    'endpoint': 'http://localhost:3000/api/pusher/auth',
    'transport': 'ajax'

  }
});


export default function Chat() {
    const [notifications, setNotifications] = useState([]);
    const [message, setMessage] = useState('')
    const [channel, setChannel] = useState({});
    
    const sendMessage = () => {
      channel.trigger("client-balls", {
        message
      });
    }

    useEffect(() => {
      const _channel = pusher.subscribe('private-kyongsucks');
      console.log('_channel', _channel)
      
  
      _channel.bind('client-balls', data => {
        console.log('do i see anything', data);
        setNotifications([...notifications, data]);
      });

      setChannel(_channel);
  
      return () => {
        pusher.unsubscribe('private-kyongsucks');
      };
    }, [notifications]);
    console.log('notifications', notifications)
    return (
      <div>
        <h2>Notifications</h2>
        <ul>
          {notifications.map(notification => (
            <li key={notification.id}>{notification.message}</li>
          ))}
        </ul>

        <textarea onChange={(e) => setMessage(e.target.value)}></textarea>
        <button type="button" onClick={sendMessage}>Send</button>
      </div>
    );
    
}