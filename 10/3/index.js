const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const port = 3003;

const wss = new WebSocket.Server({ noServer: true });

wss.on('start', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Broadcast: ${message.toString()}`);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client.html'));
});


const server = app.listen(port, () => {
  console.log(`HTTP server listening on http://localhost:${port}`);
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});