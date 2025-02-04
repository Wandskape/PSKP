const rpcWS = require("rpc-websockets");

const ws = new rpcWS.Server({ port: 4000 });

ws.event("A");
ws.event("B");
ws.event("C");

process.stdin.on("data", (data) => {
  const command = data.toString().trim();

  if (command === "A") {
    ws.emit("A");
  } else if (command === "B") {
    ws.emit("B");
  } else if (command === "C") {
    ws.emit("C");
  }
});