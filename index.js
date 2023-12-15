const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log(`a user connected`);
  console.log('socket id: ' + socket.id);

  socket.on('disconnect', () => {
    console.log('a user diconnected');
  });

  // quando chegar um evento chamado "chat message", vamos emitir essa informação
  // para todos os Sockets.
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

//node index.js << pra executar.