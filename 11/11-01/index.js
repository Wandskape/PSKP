const WebSocket = require("ws");
const fs = require("fs");

const ws = new WebSocket.Server({ port: 4000 });

ws.on("connection", (socket) => {
  const duplexStream = WebSocket.createWebSocketStream(socket);
  const writeStream = fs.createWriteStream(
    "./upload/upload_file.txt"
  );
  duplexStream.pipe(writeStream);
});

