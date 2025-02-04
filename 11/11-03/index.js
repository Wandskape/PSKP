const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 4000 });

let n = 0;
const clients = new Set();

wss.on("connection", (ws) => {
  console.log("client connected");
  clients.add(ws);

  ws.on("pong", () => {
    console.log("pong from client");
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("client disconnected");
  });
});

setInterval(() => {
  n++;
  const message = `11-03-server: ${n}`;
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}, 15000);

setInterval(() => {
  console.log(`Active connections: ${clients.size}`);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.ping();
    }
  });
}, 5000);
