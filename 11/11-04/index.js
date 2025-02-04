const WebSocket = require("ws");

const ws = new WebSocket.Server({ port: 4000 });

let n = 0;

ws.on("connection", (socket) => {
  console.log("client connected");

  socket.on("message", (data) => {
    const message = JSON.parse(data.toString());

    console.log("get from client:");
    console.log(message);

    const now = new Date();

    socket.send(
      JSON.stringify({
        server: n,
        client: message.x,
        timestamp: now.toLocaleTimeString(),
      })
    );

    n++;
  });
});
