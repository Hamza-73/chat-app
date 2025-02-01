import { Box } from '@mui/material'
import React from 'react'
import ChatHeader from './ChatHeader'
import ChatArea from './ChatArea'
import ChatFooter from './ChatFooter'

export default function ChatBox({ roomData, handleSendMsg, allMsgs, user, handleDelete, setReplyMsg, replyMsg, setReplyMsg }) {
  return (
    <Box sx={{ width: "50vw", display: "flex", height: "100%", flexDirection: "column" }}>
      {
        roomData.room ?
          <>
            <ChatHeader roomData={roomData} />
            <ChatArea allMsgs={allMsgs} user={user} handleDelete={handleDelete}
            setReplyMsg={setReplyMsg}
            />
            <ChatFooter handleSendMsg={handleSendMsg} replyMsg={replyMsg} setReplyMsg={setReplyMsg} />
          </> : <>Please Select a user</>
      }
    </Box>
  )
}
