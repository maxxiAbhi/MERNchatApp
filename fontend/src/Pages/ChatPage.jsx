import React from 'react'
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
const axios = require('axios');

function ChatPage() {
  const [chats, setchats] = useState([])
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"))

    // if(userData===null || userData===undefined || userData._id===null){
  //   console.log('yo')
  //   navigate('/')
  // }
  async function fetchDataFromBackend() {
    try {
      const { data } = await axios.get('/api/chat')
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
    <>
    <h1>{userData.name}</h1>
    <div>{chats.map((i) => <h1 key={i._id}>{i.chatName}</h1>)}</div>
    </>

  )
}

export default ChatPage