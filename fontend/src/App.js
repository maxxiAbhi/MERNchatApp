import { Route, Routes } from 'react-router-dom';
import './App.css';
import ChatPage from './Pages/ChatPage';
import Home from './Pages/Home';

function App() {

  return (
    <>
     <Routes>
     <Route path="/home" element={<Home />} />
     <Route path="/chats" element={<ChatPage />} />
     </Routes>
    </>
  );
}

export default App;
