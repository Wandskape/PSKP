const rpcWSS = require("rpc-websockets");

const ws = new rpcWSS.Client("ws://localhost:4000");

ws.on("open", () => {
  ws.call("square", [5, 4]).then((result) => {
    console.log(`rectangle area: ${result}`);
  });

  ws.call("square", [3]).then((result) => {
    console.log(`circle area: ${result}`);
  });

  ws.call("sum", [2]).then((result) => {
    console.log(`sum of [2]: ${result}`);
  });

  ws.call("sum", [2, 4, 6, 8, 10]).then((result) => {
    console.log(`sum of [2, 4, 6, 8, 10]: ${result}`);
  });

  ws.call("mul", [3]).then((result) => {
    console.log(`mul of [3]: ${result}`);
  });

  ws.call("mul", [3, 5, 7, 9, 11, 13]).then((result) => {
    console.log(`mul of [3, 5, 7, 9, 11, 13]: ${result}`);
  });

  ws.login({ login: "login", password: "pass" }).then((login) => {
    if (login) {
      ws.call("fib", [1]).then((result) => {
        console.log(`fib 1: ${result}`);
      });

      ws.call("fib", [2]).then((result) => {
        console.log(`fib 2: ${result}`);
      });

      ws.call("fib", [7]).then((result) => {
        console.log(`fib 7: ${result}`);
      });

      ws.call("fact", [0]).then((result) => {
        console.log(`fact 0: ${result}`);
      });

      ws.call("fact", [5]).then((result) => {
        console.log(`fact 5: ${result}`);
      });

      ws.call("fact", [10]).then((result) => {
        console.log(`fact 10: ${result}`);
      });
    }
  });
});
