import React, { useEffect, useState } from 'react'
import { Typography, Box, Paper, Button, TextField, Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { server } from '../../server';

export default function Register() {
    const navigate = useNavigate()

    const isUser = sessionStorage.getItem("user");
    useEffect(() => {
        if (isUser) navigate('/app', { state: JSON.parse(isUser) })
    }, [])

    const [formInput, setFormInput] = useState({
        name: "", email: "", password: ""
    });

    const handleInputChange = (e) => {
        setFormInput({ ...formInput, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formInput);
        const res = await fetch(`${server}/user/register-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formInput)
        });
        const data = await res.json();
        console.log("reponse is ", data);
    }

    return (
        <>
            <Container maxWidth="md" sx={{ display: "flex", alignItems: "center", height: "100vh" }}>
                <Grid container>
                    <Grid item md={6}>
                        <Paper square
                            sx={{
                                bgcolor: "primary.main",
                                color: "primary.contrastText",
                                height: "100%",
                                display: "flex", alignItems: "center",
                                // border: (theme) => console.log(theme)
                            }}
                        >
                            <Box sx={{ p: 5, textAlign: "center" }}>
                                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
                                    <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" preserveAspectRatio="xMinYMin meet">
                                        <circle cx="128" cy="128" r="114" stroke="#FFF" strokeWidth="20" fill="none" />
                                        <path d="M97.637 121.69c27.327-22.326 54.058-45.426 81.98-67.097-14.646 22.505-29.708 44.711-44.354 67.215-12.562.06-25.123.06-37.626-.119zM120.737 134.132c12.621 0 25.183 0 37.745.179-27.505 22.206-54.117 45.484-82.099 67.096 14.646-22.505 29.708-44.77 44.354-67.275z" fill="#FFF" />
                                    </svg>
                                    <svg width="50" height="50" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-sm me-0 w-10 h-10 text-brand dark:text-brand-dark flex origin-center transition-all ease-in-out"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>
                                </Box>
                                <Typography variant="h4" gutterBottom sx={{
                                    fontWeight: "600"
                                }}>
                                    CHAT APP
                                </Typography>
                                <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae totam tempore dolor aspernatur, labore, inventore architecto non esse dolorem sed velit incidunt delectus ratione, animi recusandae?
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item md={6}>
                        <Paper square
                            sx={{
                                height: "100%", display: "flex", alignItems: "center",
                                flexDirection: "column"
                            }}
                        >
                            <Box sx={{ p: 5, }}
                                component='form' onSubmit={handleSubmit}
                            >
                                <Typography variant='h4' sx={{ textTransform: "uppercase", mb: 3, fontWeight: "500" }}>Register</Typography>
                                <TextField
                                    fullWidth id="name"
                                    label="Full Name"
                                    variant="outlined"
                                    name='name'
                                    value={formInput.name}
                                    sx={{ mb: 3 }}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    fullWidth id="email"
                                    label="Email"
                                    variant="outlined"
                                    name='email'
                                    value={formInput.email}
                                    sx={{ mb: 3 }}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    fullWidth id="password"
                                    label="Password"
                                    variant="outlined"
                                    name='password'
                                    value={formInput.password}
                                    sx={{ mb: 3 }}
                                    onChange={handleInputChange}
                                />
                                <Button type='submit' fullWidth variant="contained" sx={{ py: 2 }}>Register</Button>
                            </Box>
                            <Box sx={{ textAlign: "right" }} >
                                <Typography>Already have an account? <Button onClick={() => navigate('/')}>login</Button></Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
