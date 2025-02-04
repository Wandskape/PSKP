import express from 'express';
import { WebSocketServer } from 'ws';


const app = express();
const httpPort = 3001;
const wssPort = 4000;

const wss = new WebSocketServer({ port: wssPort });

app.get('/start', (req, res) => {
	res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WebSocket Client</title>
    </head>
    <body>
        <h1>10-02</h1>
        <button onclick="startWS()">Start WebSocket</button>
        <div id="output"></div>
        <script>
            function startWS() {
                const ws = new WebSocket('ws://localhost:4000');
                let messageCount = 0;
                let serverMessageCount = 0;

                ws.onopen = () => {
                    console.log('WebSocket connection established');
                    const intervalId = setInterval(() => {
                        messageCount++;
                        const message = '10-01-client: ' + messageCount;
                        ws.send(message);
                        console.log('Sent:', message);

                        // Stop after 25 seconds
                        if (messageCount >= 8) {
                            clearInterval(intervalId);
                            ws.close();
                        }
                    }, 3000);
                };

                ws.onmessage = (event) => {
                    console.log('Received:', event.data);
                    document.getElementById('output').innerHTML += '<p>' + event.data + '</p>';
                };

                ws.onclose = () => {
                    console.log('WebSocket connection closed');
                };
            }
        </script>
    </body>
    </html>
  `);
});

app.use((req, res) => {
	res.sendStatus(400);
});

app.listen(httpPort, () => {
	console.log(`HTTP server listening on http://localhost:${httpPort}`);
});

wss.on('connection', (ws) => {
	console.log('WebSocket client connected');
	let clientMessageNumber = 0;
	let serverMessageNumber = 0;

	ws.on('message', (message) => {
		const messageStr = message.toString();
		console.log('Received:', messageStr);
		const match = messageStr.match(/10-01-client: (\d+)/);
		if (match) {
			clientMessageNumber = parseInt(match[1], 10);
		}
	});

	const intervalId = setInterval(() => {
		serverMessageNumber++;
		const serverMessage = `10-01-server: ${clientMessageNumber}->${serverMessageNumber}`;
		ws.send(serverMessage);
		console.log('Sent:', serverMessage);
	}, 5000);

	ws.on('close', () => {
		clearInterval(intervalId);
		console.log('WebSocket client disconnected');
	});
});
