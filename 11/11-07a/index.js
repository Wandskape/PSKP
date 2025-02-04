const rpc = require("rpc-websockets");

const ws = new rpc.Client("ws://localhost:4000");

ws.on("open", () => {
  process.stdin.on("data", (data) => {
    const event = data.toString().slice(0, -1).trim();
    
    ws.notify("notify" + event);
  });
});
