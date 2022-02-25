import React from 'react'
import { useEffect,useState } from 'react';
const axios = require('axios');
function ChatPage() {
    const [chats, setchats] = useState([])
    async function fetchDataFromBackend() {
      try {
        const {data} = await axios.get('/api/chat')
        setchats(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
        fetchDataFromBackend();
    }, [])


    return (
        <div>{chats.map((i)=><h1 key={i._id}>{i.chatName}</h1>)}</div>
    )
}

export default ChatPage