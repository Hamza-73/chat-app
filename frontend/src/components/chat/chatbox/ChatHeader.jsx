import { Avatar, Button, Card, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ChatHeader({roomData}) {
    return (
        <>
            <Card sx={{
                // bgcolor: "primary.light",
                // color: "primary.contrastText",
                borderRadius: 0
            }}
            elevation={0}
            >
                <CardHeader
                    avatar={
                        <>
                            <Button sx={{minWidth:"auto", mr:1}}>
                                <ArrowBackIcon />
                            </Button>
                            <Avatar>H</Avatar>
                        </>
                    }

                    action={
                        <>
                            <IconButton>
                                <VideocamIcon />
                            </IconButton>
                            <IconButton>
                                <CallIcon />
                            </IconButton>
                        </>
                    }
                    title={roomData.reciever.name}
                    subheader={
                        <Typography variant='caption'>{roomData.reciever.email}</Typography>
                    }
                />
            </Card>
        </>
    )
}
