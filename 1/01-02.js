const http = require("http");

const server = http.createServer(function (request, response) {
  let body = "";

  request.on("data", (chunk) => {
    body += chunk;
    console.log(chunk)
  });

  request.on("end", () => {
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8"});

    response.write(`Тип запроса: ${request.method}\n`);
    response.write(`Url: ${request.url}\n`);
    response.write(`Версия протокола: ${request.httpVersion}\n`);
    response.write(`Тело запроса: ${body}\n`);
    response.write(`Все заголовки: ${JSON.stringify(request.headers)}\n`);
    response.end();
  });
});

server.listen(3000);
