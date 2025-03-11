const net = require('net');

if (process.argv.length !== 3) {
    console.error('Usage: node client.js <number>');
    process.exit(1);
}

const X = parseInt(process.argv[2], 10);
if (isNaN(X)) {
    console.error('Invalid number');
    process.exit(1);
}

const PORT = 5000;
const client = new net.Socket();

client.connect(PORT, '127.0.0.1', () => {
    console.log(`Connected to server, sending ${X} every second`);

    const sendNumber = () => {
        const buffer = Buffer.alloc(4);
        buffer.writeInt32LE(X, 0);
        client.write(buffer);
        setTimeout(sendNumber, 1000);
    };

    sendNumber();
});

client.on('data', (data) => {
    if (data.length === 4) {
        const sum = data.readInt32LE(0);
        console.log(`Received sum from server: ${sum}`);
    } else {
        console.log('Invalid sum received');
    }
});

client.on('close', () => {
    console.log('Connection closed');
});

client.on('error', (err) => {
    console.error(`Connection error: ${err.message}`);
});
