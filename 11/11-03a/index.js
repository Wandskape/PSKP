const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:4002");

ws.on("open", () => {
  console.log("connected to server");
});

ws.on("message", (message) => {
  console.log(`received: ${message}`);
});

ws.on("ping", () => {
  console.log("received ping from server, sending pong");
});

ws.on("close", () => {
  console.log("disconnected from server");
});
