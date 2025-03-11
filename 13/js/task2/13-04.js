const net = require('net');

const PORT = 5000;
const client = new net.Socket();

client.connect(PORT, '127.0.0.1', () => {
    console.log('Connected to server');

    let counter = 0;
    const sendNumber = () => {
        if (counter >= 20) {
            console.log('Stopping client after 20 seconds.');
            client.end();
            return;
        }

        const number = Math.floor(Math.random() * 100);
        console.log(`Sending number: ${number}`);

        const buffer = Buffer.alloc(4);
        buffer.writeInt32LE(number, 0);
        client.write(buffer);

        counter++;
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
