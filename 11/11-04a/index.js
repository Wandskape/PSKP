const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:4000");

const x = process.argv[2];

ws.on("open", () => {
  const now = new Date();

  const message = {
    client: x,
    timestamp: now.toLocaleTimeString(),
  };
  ws.send(JSON.stringify(message));
});

ws.on("message", (data) => {
  console.log("get from server:");
  console.log(JSON.parse(data.toString()));
  ws.close();
});
