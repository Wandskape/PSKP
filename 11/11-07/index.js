const rpc = require("rpc-websockets");

const ws = new rpc.Server({ port: 4000 });


ws.on("open", () => {
  console.log("Сервер запущен");
})

ws.register("notifyA", () => {
  console.log("A event"); 
}).public();

ws.register("notifyB", () => {
  console.log("B event"); 
}).public();

ws.register("notifyC", () => {
  console.log("C event"); 
}).public();