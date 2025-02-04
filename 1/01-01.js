const http = require("http");

const server =  http.createServer(function(request, response){
    response.write("<h1>Hello World</h1>");
    response.end();
});

server.listen(3000);