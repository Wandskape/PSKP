const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const SERVER_PORT = 40000;
const SERVER_ADDRESS = '127.0.0.1';

const message = Buffer.from('Hello, UDP Server!');

client.send(message, SERVER_PORT, SERVER_ADDRESS, (err) => {
    if (err) console.error('Error sending message:', err);
    console.log('Message sent to server');
});

client.on('message', (msg) => {
    console.log(`Received from server: ${msg}`);
    client.close();
});
