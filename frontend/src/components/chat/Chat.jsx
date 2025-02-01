import { Paper } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import SideBar from './sidebar/SideBar.jsx'
import ChatBox from './chatbox/ChatBox'
import Profile from './profile/Profile'
import { useLocation, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import { server } from '../../server'

export default function Chat() {

  const socketRef = useRef();

  const navigate = useNavigate();
  const { state } = useLocation();

  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [roomData, setRoomData] = useState({
    room: null
  });
  const [allMsgs, setAllMsgs] = useState([]);
  const [replyMsg, setReplyMsg] = useState(null);

  // console.log("state is ", state)
  useEffect(() => {
    if (!state) navigate('/');
    // console.log("url is ", frontendUrl)
    const socket = io.connect(server);
    socketRef.current = socket;
    socket.on("connect", () => setIsSocketConnected(true))
    socket.off("disconnect", () => setIsSocketConnected(false))
    // console.log("socket is ", socket)
  }, [])

  useEffect(() => {
    if (isSocketConnected) {
      socketRef.current.emit("ADD_USER", state)
      socketRef.current.on("USER_ADDED", (data) => {
        // console.log("data is ", data)
        setOnlineUsers(data)
      })
      socketRef.current.on("RECIEVE_MSG", (data) => {
        // console.log("data from server ", data)
        setAllMsgs(prevState => [...prevState, data]);
      })
      socketRef.current.on("DELETED_MSG", (data) => {
        // console.log("data from server ", data)
        setAllMsgs((prevState) =>
          prevState.filter((item) => {
            // console.log("item is ", item);
            // console.log("data is ", data);
            item._id != data.msg._id
          })
        );
      })
      return () => socketRef.current.disconnect();
    }
  }, [isSocketConnected])

  const handleSendMsg = (msg => {
    // console.log(msg);
    if (socketRef.current.connected) {
      let sender = state;
      sender.socketId = socketRef.current.id;
      const data = {
        msg,
        reciever: roomData.reciever,
        sender
      }
      if(replyMsg){
        data.replyMsg = replyMsg
      }
      // console.log("data in sending message is ", data)
      socketRef.current.emit("SEND_MESSAGE", data);
      setReplyMsg(null);
      // setAllMsgs(prevState => [...prevState, data]);
      // console.log("all messages are ", allMsgs)
    }
  });

  const handleDelete = async (id) => {
    fetch(`${server}/message/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          // console.log("here")
          return res.json();
        }
      })
      .then((resData) => {
        // console.log("res is ", resData)
        if (socketRef.current.connected) {
          const data = {
            msg: resData.data,
            reciever: roomData.reciever,
          }
          socketRef.current.emit("DELETE_MESSAGE", data);
          setAllMsgs((prevState) =>
            prevState.filter((data) => data._id != resData.data._id)
          );
        }
      })
      .catch(err => {
        console.log("error in deleting message ", err)
      })
  };

  console.log(replyMsg)

  if (!state) return null
  return (
    <>
      <Paper square elevation={0} sx={{ width: "100vw", display: "flex" }}>
        <SideBar
          user={state} onlineUsers={onlineUsers}
          roomData={roomData} setRoomData={setRoomData}
          setAllMsgs={setAllMsgs}
        />
        <ChatBox roomData={roomData}
          handleSendMsg={handleSendMsg} allMsgs={allMsgs}
          user={state} handleDelete={handleDelete}
          setReplyMsg={setReplyMsg} replyMsg={replyMsg}
          />
        <Profile user={state} />
      </Paper>
    </>
  )
}
