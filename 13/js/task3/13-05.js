const net = require('net');

const PORT = 5000;
const clients = new Map();

const server = net.createServer((socket) => {
    console.log('Client connected');

    const clientId = `${socket.remoteAddress}:${socket.remotePort}`;
    clients.set(clientId, { socket, sum: 0 });

    socket.on('data', (data) => {
        if (data.length === 4) {
            const number = data.readInt32LE(0);
            const client = clients.get(clientId);
            client.sum += number;
            console.log(`[${clientId}] Received: ${number}, Total: ${client.sum}`);
        } else {
            console.log(`[${clientId}] Invalid data received`);
        }
    });

    socket.on('end', () => {
        console.log(`[${clientId}] Client disconnected`);
        clients.delete(clientId);
    });

    socket.on('error', (err) => {
        console.error(`[${clientId}] Error: ${err.message}`);
        clients.delete(clientId);
    });
});

setInterval(() => {
    clients.forEach((client, clientId) => {
        const buffer = Buffer.alloc(4);
        buffer.writeInt32LE(client.sum, 0);

        client.socket.write(buffer);
        console.log(`[${clientId}] Sent sum: ${client.sum}`);
    });
}, 5000);

server.listen(PORT, () => {
    console.log(`TCP server listening on port ${PORT}`);
});
