const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, {
  allowEIO3: true,
  cors: {
    origin: 'http://localhost:8000',
    credentials: true,
  },
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.emit('welcome', 'Welcome to the socket io server');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(8000, () => {
  console.log('Listening on port 8000');
});
