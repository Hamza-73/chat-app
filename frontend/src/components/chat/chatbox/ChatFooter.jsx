import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

export default function ChatFooter({ handleSendMsg, replyMsg, setReplyMsg }) {

    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        setMsg(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (msg) {
            handleSendMsg(msg);
        }
        setMsg("")
    }

    return (
        <Box sx={{ p: 1, display: "flex", position: "relative" }}>
            {
                replyMsg && (
                    <Box
                        sx={{
                            position: "absolute",
                            left: 0,
                            mt: 3,
                            bottom: "57px",
                            right: "0",
                            background: "#ddd",
                            p: 1,
                            borderLeft: "4px solid",
                            borderColor: "primary.light"
                        }}
                    >
                        <Typography>{replyMsg.sender.name}</Typography>
                        <Typography variant="caption" >{replyMsg.msg}</Typography>
                        <IconButton aria-label="close"
                            sx={{ position: "absolute", top: 0, right: 0, }}
                            onClick={() => setReplyMsg(null)} 
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                )
            }
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button sx={{ minWidth: "auto", mr: 1 }}>
                    <MoreVertIcon />
                </Button>
                <Button sx={{ minWidth: "auto", mr: 1 }}>
                    <EmojiEmotionsIcon />
                </Button>
            </Box>
            <Box sx={{ display: "flex", flex: 1 }}
                component="form" onSubmit={handleSubmit}
            >
                <TextField placeholder='Enter Message' size='small' sx={{
                    "& .MuiInputBase-input": {
                        borderRadius: 0,
                        border: "none"
                    }
                }}
                    fullWidth
                    value={msg}
                    onChange={handleChange}
                />
                <Button type="submit"><SendIcon /></Button>
            </Box>

        </Box>
    )
}
