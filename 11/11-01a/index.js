const WebSocket = require("ws");
const fs = require("fs");

const ws = new WebSocket("ws://localhost:4000");

ws.on("open", () => {
  const duplex = WebSocket.createWebSocketStream(ws);
  const readStream = fs.createReadStream(
    "D:/LABS/Node/11/11-01a/file.txt"
  );
  readStream.pipe(duplex);
});
