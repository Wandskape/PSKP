const http = require('http');
let hoststate = 'norm';
let state = 'norm';

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>Application state: ${state}</h1>`);
});

process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
    const input = data.trim();
    if (['norm', 'stop', 'test', 'idle', 'exit'].includes(input)) {
        if (input === 'exit') {
            console.log('Exiting...');
            process.exit(0);
        } else {
            hoststate = input;
            state = input;
            console.log(`State changed to: ${hoststate}`);
        }
    } else {
        state = input;
        console.log(`Invalid state: ${input}`);
    }
});

server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
    console.log(`Current state: ${state}`);
});
