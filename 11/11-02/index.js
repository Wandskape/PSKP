const WebSocket = require("ws");
const fs = require("fs");

const ws = new WebSocket.Server({ port: 4000 });

ws.on("connection", (socket) => {
  const duplex = WebSocket.createWebSocketStream(socket);
  const readStream = fs.createReadStream(
    "D:/LABS/node/11/11-01a/file.txt"
  );
  readStream.pipe(duplex);
});
