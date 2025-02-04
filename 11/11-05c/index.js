const async = require("async");
const rpcWSS = require("rpc-websockets");

const ws = new rpcWSS.Client("ws://localhost:4000");

const tasksFunc = (x = ws) =>
  async.parallel(
    {
      fact7: (callback) => {
        ws.login({ login: "login", password: "pass" }).then((login) => {
          if (login) {
            ws.call("fact", [7]).then((result) => {
              callback(null, result);
            });
          }
        });
      },
      mul246: (callback) => {
        ws.call("mul", [2, 4, 6]).then((result) => {
          callback(null, result);
        });
      },
      square3: (callback) => {
        ws.call("square", [3]).then((result) => {
          callback(null, result);
        });
      },
      square54: (callback) => {
        ws.call("square", [5, 4]).then((result) => {
          callback(null, result);
        });
      },
      mul357911: (callback) => {
        ws.call("mul", [3, 5, 7, 9, 11, 13]).then((result) => {
          callback(null, result);
        });
      },
    },
    (err, results) => {
      const fact7 = results.fact7;
      const mul246 = results.mul246;
      const square3 = results.square3;
      const square54 = results.square54;
      const mul357911 = results.mul357911;

      async.parallel(
        {
          sumsum: (callback) => {
            ws.call("sum", [square3, square54, mul357911]).then((result) => {
              callback(null, result);
            });
          },
        },
        (err, innerResults) => {
          const sumsum = innerResults.sumsum;

          const finalResult = sumsum + fact7 * mul246;

          console.log(`result: ${finalResult}`);

          ws.close();
        }
      );
    }
  );

ws.on("open", tasksFunc);
