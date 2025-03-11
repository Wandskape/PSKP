const net = require('net');

if (process.argv.length !== 3) {
    console.error('Usage: node client.js <port>');
    process.exit(1);
}

const PORT = parseInt(process.argv[2], 10);
if (![40000, 50000].includes(PORT)) {
    console.error('Invalid port. Use 40000 or 50000.');
    process.exit(1);
}

const client = new net.Socket();

client.connect(PORT, '127.0.0.1', () => {
    console.log(`Connected to server on port ${PORT}`);

    const sendNumber = () => {
        const number = Math.floor(Math.random() * 100);
        console.log(`[Port ${PORT}] Sending number: ${number}`);

        const buffer = Buffer.alloc(4);
        buffer.writeInt32LE(number, 0);
        client.write(buffer);

        setTimeout(sendNumber, 1000);
    };

    sendNumber();
});

client.on('data', (data) => {
    console.log(`[Port ${PORT}] Received from server: ${data.toString()}`);
});

client.on('close', () => {
    console.log(`[Port ${PORT}] Connection closed`);
});

client.on('error', (err) => {
    console.error(`[Port ${PORT}] Connection error: ${err.message}`);
});
