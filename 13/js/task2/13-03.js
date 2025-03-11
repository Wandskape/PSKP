const net = require('net');

const PORT = 5000;
let totalSum = 0;
const clients = new Set();

const server = net.createServer((socket) => {
    console.log('Client connected');
    clients.add(socket);

    socket.on('data', (data) => {
        if (data.length === 4) {
            const number = data.readInt32LE(0);
            console.log(`Received number: ${number}`);
            totalSum += number;
        } else {
            console.log('Invalid data received');
        }
    });

    socket.on('end', () => {
        console.log('Client disconnected');
        clients.delete(socket);
    });

    socket.on('error', (err) => {
        console.error(`Socket error: ${err.message}`);
        clients.delete(socket);
    });
});

setInterval(() => {
    console.log(`Sending sum: ${totalSum}`);
    const buffer = Buffer.alloc(4);
    buffer.writeInt32LE(totalSum, 0);

    clients.forEach(client => client.write(buffer));
}, 5000);

server.listen(PORT, () => {
    console.log(`TCP server listening on port ${PORT}`);
});
