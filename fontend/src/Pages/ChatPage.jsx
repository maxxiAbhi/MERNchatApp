import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBox from '../components/ChatComponents/ChatBox';
import Navbar from '../components/ChatComponents/Navbar';

const axios = require('axios');

function ChatPage() {
  // const [chats, setchats] = useState([])
  const navigate = useNavigate();

  // async function fetchDataFromBackend() {
  //   try {
  //     const { data } = await axios.get('/api/chat')
  //     setchats(data)
  //     console.log(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const userData = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if (!userData) {
      return navigate("/");
    }
    // fetchDataFromBackend();
  }, [navigate])


  return (
    <>
    <Navbar />
    <ChatBox />
    </>

  )
}

export default ChatPage