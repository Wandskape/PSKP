const rpcWS = require("rpc-websockets");

const ws = new rpcWS.Client("ws://localhost:4000");

ws.on("open", () => {
  ws.subscribe("A");

  ws.on("A", () => {
    console.log("A event");
  });
});
