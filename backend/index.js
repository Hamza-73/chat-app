const express = require("express");
const http = require("http");
// const  {Server}  = require("socket.io");
const cors = require("cors");
const app = express();
const socket = require('./socket/socket')

const connectToDataBase = require('./config/db');

const corsOptions = {
    origin: "*",
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"],
}

const server = http.createServer(app);

// io.on("connection", (socket) => {
//     console.log("socket id is ", socket.id);
// });

app.use(cors(corsOptions));
app.use(express.json());

connectToDataBase().then(()=>{ 
    socket(server)
    server.listen(5000, ()=>{
        console.log('Server is running on port 5000');
    });
})

const userRoutes = require('./routes/user.route');
const messageRoutes = require('./routes/message.route');

app.use('/user', userRoutes);
app.use('/message', messageRoutes);
// httpServer.listen(3000, ()=>{
//     console.log("Server Running on port 3000")
// });

