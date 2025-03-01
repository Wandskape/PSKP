const WebSocket = require("ws");
const fs = require("fs");

const ws = new WebSocket("ws://localhost:4000");

ws.on("open", () => {
  const duplex = WebSocket.createWebSocketStream(ws);
  const writeStream = fs.createWriteStream(
    "downloaded_file.txt"
  );
  duplex.pipe(writeStream);
});
