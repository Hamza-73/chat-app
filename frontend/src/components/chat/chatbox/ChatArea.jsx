import { Avatar, Box, Chip, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { server } from '../../../server';

export default function ChatArea({ allMsgs, user, handleDelete, setReplyMsg }) {

    return (
        <Box sx={{
            height: '78vh',
            // flex:"1 0 0",
            overflowY: "auto",
            background: "#f9f9f9f9"
        }}>


            <Stack direction="row" justifyContent="center" sx={{
                py: 2,
                position: "sticky",
                top: 0,
                background: "#f9f9f9f9",
                zIndex: 2
            }}>
                <Chip label="Today" />
            </Stack>

            <List sx={{ overflowY: "auto", p: 0, flex: "1 0 0", display: "flex", flexDirection: "column", gap: 2 }} >

                {/* SENDER MESSAGE */}
                {
                    Array.from(allMsgs).map((item) => {
                        return (
                            <ListItem
                                sx={
                                    item.sender.id === user.id
                                        ? { flexDirection: "row-reverse", mb: 2 }
                                        : { mb: 2 }
                                }
                            >
                                <Box
                                    sx={
                                        item.sender.id === user.id
                                            ? {
                                                display: "flex",
                                                width: "80%",
                                                flexDirection: "row-reverse",
                                            }
                                            : { display: "flex", width: "80%" }
                                    }
                                >
                                    <ListItemAvatar
                                        sx={
                                            item.sender.id === user.id && {
                                                display: "flex",
                                                flexDirection: "row-reverse",
                                            }
                                        }
                                    >
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <Paper
                                        sx={
                                            item.sender.id === user.id
                                                ? { width: "100%", p: 1.5, bgcolor: "primary.light" }
                                                : { width: "100%", p: 1.5 }
                                        }
                                    >
                                        {
                                            item.replyMsg && 
                                            <Paper
                                            sx={
                                                item.sender.id === user.id
                                                ? { mb:1, p: 1.5 }
                                                : { mb:1, p: 1.5, bgcolor: "primary.light" }
                                            }
                                            >
                                                {item.replyMsg.sender.name} <br />
                                                <Typography variant="caption">{item.replyMsg.msg}</Typography> <br />
                                            </Paper>
                                        }
                                        <ListItemText
                                            sx={
                                                item.sender.id === user.id
                                                    ? { m: 0, color: "primary.contrastText" }
                                                    : { m: 0 }
                                            }
                                            primary={item.sender.name}
                                            secondary={
                                                <Typography variant="caption">{item.msg}</Typography>
                                            }
                                        />
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                mt: 1,
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={
                                                    item.sender.id === user.id && {
                                                        color: "primary.contrastText",
                                                    }
                                                }
                                            >
                                                12.20 PM
                                            </Typography>
                                                <Box>
                                                    <IconButton>
                                                        <ContentCopyIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton onClick={()=>handleDelete(item._id)}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton onClick={()=>setReplyMsg(item)}>
                                                        <ReplyIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                    </Paper>
                                </Box>
                            </ListItem>
                        )
                    })
                }

                {/* YOUR MESSAGE */}
                {/* <ListItem
                    sx={{ cursor: "pointer", flexDirection: "row-reverse" }}
                >
                    <Box sx={{ display: "flex", width: "80%", flexDirection: "row-reverse" }}>
                        <ListItemAvatar sx={{ display: "flex", flexDirection: "row-reverse" }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <Paper sx={{ width: "100%", p: 1.5, bgcolor: "primary.light", color: "primary.contrastText" }}>
                            <ListItemText
                                sx={{ m: 0 }}
                                primary="Husnain"
                                secondary={
                                    <Typography
                                        variant="caption"
                                    >
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit assumenda explicabo iste natus quibusdam, nesciunt non. Voluptas atque iure facere.
                                    </Typography>
                                }
                            />
                            <Box mt={1} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Typography variant="caption" color="text.secondary" >12:30 PM</Typography>
                                <Box>
                                    <IconButton>
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton>
                                        <ReplyIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </ListItem> */}
            </List>
        </Box>
    )
}
