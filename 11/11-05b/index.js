const async = require("async");
const rpcWSS = require("rpc-websockets");

const ws = new rpcWSS.Client("ws://localhost:4000");

const tasksFunc = (x = ws) =>
  async.parallel(
    {
      square1: (callback) => {
        ws.call("square", [5, 4]).then((result) => {
          callback(null, result);
        });
      },
      square2: (callback) => {
        ws.call("square", [3]).then((result) => {
          callback(null, result);
        });
      },
      sum1: (callback) => {
        ws.call("sum", [2]).then((result) => {
          callback(null, result);
        });
      },
      sum2: (callback) => {
        ws.call("sum", [2, 4, 6, 8, 10]).then((result) => {
          callback(null, result);
        });
      },
      mul1: (callback) => {
        ws.call("mul", [3]).then((result) => {
          callback(null, result);
        });
      },
      mul2: (callback) => {
        ws.call("mul", [3, 5, 7, 9, 11, 13]).then((result) => {
          callback(null, result);
        });
      },
      fib1: (callback) => {
        ws.login({ login: "login", password: "pass" }).then((login) => {
          if (login) {
            ws.call("fib", [1]).then((result) => {
              callback(null, result);
            });
          }
        });
      },
      fib2: (callback) => {
        ws.login({ login: "login", password: "pass" }).then((login) => {
          if (login) {
            ws.call("fib", [2]).then((result) => {
              callback(null, result);
            });
          }
        });
      },
      fib3: (callback) => {
        ws.login({ login: "login", password: "pass" }).then((login) => {
          if (login) {
            ws.call("fib", [7]).then((result) => {
              callback(null, result);
            });
          }
        });
      },
      fact1: (callback) => {
        ws.login({ login: "login", password: "pass" }).then((login) => {
          if (login) {
            ws.call("fact", [0]).then((result) => {
              callback(null, result);
            });
          }
        });
      },
      fact2: (callback) => {
        ws.login({ login: "login", password: "pass" }).then((login) => {
          if (login) {
            ws.call("fact", [5]).then((result) => {
              callback(null, result);
            });
          }
        });
      },
      fact3: (callback) => {
        ws.login({ login: "login", password: "pass" }).then((login) => {
          if (login) {
            ws.call("fact", [10]).then((result) => {
              callback(null, result);
            });
          }
        });
      },
    },
    (err, result) => {
      console.log(result);
      ws.close();
    }
  );

ws.on("open", tasksFunc);
