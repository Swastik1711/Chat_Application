const http = require("http");
const express = require("express");
const { Server } = require("socket.io");


const app = express();
const port = 4500 || process.env.PORT;

const users = {};

app.get("/", (req, res) => {
    res.send("Its Working");
})

// .createServer() turns your computer to an HTTP server, creates an HTTP server object
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("New Connection");

    socket.on("new-user-joined", ({ user }) => {
        users[socket.id] = user;
        io.emit('user-joined', users);
    });

    socket.on('message', ({ ciphertext, id }) => {
        // sending to all including sender
        io.emit('sendMessage', { user: users[id], message: ciphertext, id });
    });

    socket.on('disconnect', () => {
        console.log(`${users[socket.id]} left`);
        delete users[socket.id];
        socket.broadcast.emit('user-left', users);
    });

});

server.listen(port, () => {
    console.log(`server is working on http://localhost:${port}`);
})























/*
io.on("connection", (socket) => {
    console.log("New Connection");

    socket.on("new-user-joined", ({ user }) => {
        users[socket.id] = user;
        socket.broadcast.emit('user-joined', { user: "Admin", message: `${users[socket.id]} has joined` });
        //socket.emit('welcome-new-user', { user: "Admin", message: `Welcome to the chat, ${users[socket.id]}` });
        console.log(`${user} has joined`);
    });

    socket.on('message', ({ciphertext,id}) => {
        // sending to all including sender
        io.emit('sendMessage', { user: users[id], message: ciphertext, id });
    })

    socket.on('disconnect', () => {
        io.emit('user-leave', { user: "Admin", message: `${users[socket.id]} has left` });
        console.log(`user left`);
    });

});
*/