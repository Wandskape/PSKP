const net = require('net');

const server = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        const message = data.toString().trim();
        console.log(`Received: ${message}`);
        socket.write(`ECHO: ${message}`);
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });

    socket.on('error', (err) => {
        console.error(`Socket error: ${err.message}`);
    });
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`TCP server listening on port ${PORT}`);
});
