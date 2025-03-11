const net = require('net');

const PORTS = [40000, 50000];

const handleClient = (socket, port) => {
    console.log(`Client connected on port ${port}`);

    socket.on('data', (data) => {
        if (data.length === 4) {
            const number = data.readInt32LE(0);
            console.log(`[Port ${port}] Received: ${number}`);

            const response = `ECHO: ${number}`;
            socket.write(response);
        } else {
            console.log(`[Port ${port}] Invalid data received`);
        }
    });

    socket.on('end', () => {
        console.log(`Client disconnected from port ${port}`);
    });

    socket.on('error', (err) => {
        console.error(`Error on port ${port}: ${err.message}`);
    });
};

PORTS.forEach((port) => {
    const server = net.createServer((socket) => handleClient(socket, port));
    server.listen(port, () => console.log(`TCP server listening on port ${port}`));
});
