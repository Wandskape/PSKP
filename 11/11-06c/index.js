const rpcWS = require("rpc-websockets");

const ws = new rpcWS.Client("ws://localhost:4000");

ws.on("open", () => {
  ws.subscribe("C");

  ws.on("C", () => {
    console.log("C event");
  });
});
