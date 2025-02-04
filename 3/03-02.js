const http = require('http');
const url = require('url');

function factorial(n) {
    return n === 0 ? 1 : n * factorial(n - 1);
}

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;

    if (req.url.startsWith('/fact')) {
        const k = parseInt(queryObject.k);
        if (!isNaN(k)) {
            const fact = factorial(k);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ k, fact }));
        } else {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end('<h1>Invalid input</h1>');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Not Found</h1>');
    }
});

server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
