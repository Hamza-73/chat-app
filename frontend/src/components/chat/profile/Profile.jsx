import { Avatar, Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import socket from '../socket'

export default function Profile({user}) {
  
  const navigate = useNavigate()
  const logout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    navigate('/')
  }

  // useEffect(()=>{
  //   console.log("socket", socket.id)
  // },[socket])

  return (
    <Box sx={{
      width: "25vw", background: "#eee",
      display: "flex", justifyContent: "center",
      alignItems: "center", flexDirection: "column",
      gap: 2
    }}>
      <Avatar src="https://mui.com/static/images/avatar/2.jpg"
        sx={{ width: "156px", height: "156px" }}
      />
      <Typography variant="h4"
        sx={{ color: "primary.light", textTransform: "uppercase" }}>
        {user.name}
      </Typography>
      <Typography variant="subtitle1" >UI Frontend Developer</Typography>
      <Typography variant="subtitle2" >{user.email}</Typography>
      <Button onClick={logout}
      variant='contained' sx={{mt:2}}
      >Logout</Button>
    </Box>
  )
}
