const socket = require("socket.io");

const { saveMsg } = require('../controller/message.controller.js')

let onlineUsers = []

const addUser = (user, socketId) => {
    // console.log("user is ", user._id)
    const isExist = onlineUsers.findIndex((item) => item.id === user.id);
    // console.log("is exist ", isExist)
    if (isExist !== -1) {
        onlineUsers.splice(isExist, 1);
        // console.log("hi")
        // onlineUsers[isExist].socketId = socketId;
    }
    user.socketId = socketId;
    onlineUsers.push(user);
};

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const socketInit = (server) => {
    const io = socket(server, {
        cors: {
            origin: 'http://localhost:5173'
        }
    });

    io.on("connection", (socket) => {
        // console.log(socket.id);

        socket.on("ADD_USER", (user) => {
            addUser(user, socket.id);
            io.emit("USER_ADDED", onlineUsers);
        });

        socket.on("SEND_MESSAGE", async (msg) => {
            console.log("message from frontend ", msg)
            const isSaved = await saveMsg(msg);
            // console.log("isSaved ", isSaved);
            // console.log("reciever is ", msg.reciever.socketId)
            // console.log("sender is ", msg.sender.socketId)
            io.to(msg.receiver?.socketId)
                .to(msg.sender?.socketId)
                .emit("RECIEVE_MSG", isSaved, ()=>{
                    // console.log("ruuning")
                    // console.log('here ', isSaved)
                });
        });

        socket.on("DELETE_MESSAGE", (msg) => {
            console.log("running")
            socket.to(msg.reciever.socketId).emit("DELETED_MSG", msg)
        });

        socket.on("disconnect", () => {
            console.log("on disconnecting ", socket.id);
            removeUser(socket.id);
            io.emit("USER_ADDED", onlineUsers);
        });
    });
}

module.exports = socketInit;