require('dotenv').config()

const http = require('http');
const path = require('path');
const express = require('express');
const { Server } = require('socket.io');

// Initialize express app
const app = express();
const server = http.createServer(app);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up socket.io
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('send message', (data) => {
        console.log('Message received:', data); // For debugging
        io.emit('send message', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const port = 5000;

server.listen(port, () => {
    console.log(`Server is listening at port: ${port}`);
});
