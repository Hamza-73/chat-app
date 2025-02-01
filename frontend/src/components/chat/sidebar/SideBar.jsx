import React, { useState } from 'react'
import Header from './Header'
import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Tab, Tabs, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import { server } from '../../../server';

export default function SideBar({ user, onlineUsers, roomData, setRoomData, setAllMsgs }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSetRoom = (user) => {
        setRoomData({
            ...roomData,
            room: "test",
            reciever: user
        });

        fetch(`${server}/message/${user.id}`, {
            method: 'GET',
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json(); // Return the JSON promise
            })
            .then((data) => {
                console.log("message is ", data);
                setAllMsgs(data.data)                
            })
            .catch((error) => {
                console.error("Error fetching messages:", error);
            });
    };

    return (
        <>
            <Box sx={{ width: "25vw", display: "flex", flexDirection: "column", height: "100vh" }}>
                <Header user={user} roomData={roomData} />
                <Tabs value={value} onChange={handleChange}
                    aria-label="basic tabs example"
                    variant='fullWidth'
                >
                    <Tab label="Chat List" icon={<ChatIcon fontSize='small' />} iconPosition='start' sx={{ minHeight: "inherit" }} />
                    <Tab label="User List" icon={<PersonIcon fontSize='small' />} iconPosition='start' sx={{ minHeight: "inherit" }} />
                </Tabs>
                {value === 0 &&
                    <List sx={{ overflowY: "auto", p: 0, flex: "1 0 0" }} >
                        {
                            onlineUsers && Array.from(onlineUsers)
                                .filter(elm => elm.id !== user.id)
                                .map((user, index) => {
                                    return (
                                        <React.Fragment
                                            key={user.id}>
                                            <ListItem alignItems="flex-start"
                                                sx={{ cursor: "pointer" }}
                                                onClick={() => handleSetRoom(user)}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={user.name}
                                                    secondary={
                                                        <Typography
                                                            variant="caption"
                                                        >
                                                            {user.email}
                                                        </Typography>
                                                    }
                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                        </React.Fragment>
                                    )
                                })
                        }
                    </List>
                }
                {value === 1 && <div>1</div>}
            </Box>
        </>
    )
}
