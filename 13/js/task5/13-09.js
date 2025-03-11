const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const PORT = 40000;

server.on('message', (msg, rinfo) => {
    console.log(`Received: ${msg}`);

    const response = `ECHO: ${msg}`;
    server.send(response, rinfo.port, rinfo.address, (err) => {
        if (err) console.error('Error sending response:', err);
    });
});

server.on('listening', () => {
    const address = server.address();
    console.log(`UDP Server listening on ${address.address}:${address.port}`);
});

server.bind(PORT);
