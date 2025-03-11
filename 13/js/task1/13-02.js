const net = require('net');

const client = new net.Socket();

client.connect(5000, '127.0.0.1', () => {
    console.log('Connected to server');
    const message = 'Hello, Server!';
    console.log(`Sending: ${message}`);
    client.write(message);
});

client.on('data', (data) => {
    console.log(`Received: ${data.toString()}`);
    client.end();
});

client.on('close', () => {
    console.log('Connection closed');
});

client.on('error', (err) => {
    console.error(`Connection error: ${err.message}`);
});
