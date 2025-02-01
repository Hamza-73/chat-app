import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes , Route, Link } from 'react-router-dom'
import Login from './components/auth/Login.jsx'
import Register from './components/auth/Register.jsx'
import Chat from './components/chat/Chat.jsx'

export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<Chat />} />
      </Routes>
    </Router>
    </>
  )
}
