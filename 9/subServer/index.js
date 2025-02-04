import express from 'express'
import multer from "multer";
import path from 'path'
import { fileURLToPath } from "url";


const app = express()
const port = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
const storage = multer.memoryStorage();
const upload = multer({ storage });



app.get('/socket', (req, res) => {
	const clientIP = req.connection.remoteAddress
	const clientPort = req.connection.remotePort;

	const serverIP = req.connection.localAddress;
	const severPort = req.connection.localPort;

	res.send(`clientIP ${clientIP} clientPort ${clientPort} serverIP ${serverIP} severPort ${severPort}`);
})

app.post('/json', (req, res) => {
	const { __comment, x, y, s, m, o } = req.body;

	const x_plus_y = x + y;
	const Concat_so = `${s} ${o.surname}, ${o.name}`;
	const Lenght_m = m.length;


	const responseData = {
		"__comment": __comment,
		"x_plus_y": x_plus_y,
		"Concatination_s_o": Concat_so,
		"Lenght_m": Lenght_m
	};

	res.json(responseData);
})

app.post('/xml', (req, res) => {
	res.end("xml")
})


app.post('/file', upload.single('file'), (req, res) => {
	if (req.file) {
		console.log('Uploaded file:', req.file.originalname);
		res.end('File upload received');
	} else {
		console.log('No file uploaded');
		res.status(400)
		   .send('No file uploaded');
	}
});

app.get('/download', (req, res) => {
	const file = path.join(__dirname, 'files', 'MyFile.txt');
	res.download(file, (err) => {
		if (err) {
			console.error('Error sending file:', err);
			res.status(500)
			   .send('Error occurred');
		}
	})
})


app.listen(port, () => {
	console.log(`Listening on port ${port}`);
})
