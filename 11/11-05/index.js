const rpcWSS = require("rpc-websockets");

const server = new rpcWSS.Server({ port: 4000 });

server.setAuth((l) => {
  return l.login == "login" && l.password == "pass";
});

server
  .register("square", (params) => {
    if (params.length === 1) {
      const r = params[0];
      return 3.14 * r * r;
    }

    return params[0] * params[1];
  })
  .public();

server
  .register("sum", (params) => {
    return params.reduce((acc, val) => acc + val, 0);
  })
  .public();

server
  .register("mul", (params) => {
    return params.reduce((acc, val) => acc * val, 1);
  })
  .public();

server
  .register("fib", (params) => {
    const n = params[0];
    const fib = [];

    for (let i = 0; i < n; i++) {
      if (i === 0) {
        fib.push(0);
      } else if (i === 1) {
        fib.push(1);
      } else {
        fib.push(fib[i - 1] + fib[i - 2]);
      }
    }

    return fib;
  })
  .protected();

server
  .register("fact", (params) => {
    const n = params[0];

    const factorial = (num) => {
      if (num === 0 || num === 1) return 1;
      return num * factorial(num - 1);
    };

    return factorial(n);
  })
  .protected();
