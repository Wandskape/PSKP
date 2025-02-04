import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from "url";


const port = 5001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(express.json());


app.get('/1', async (req, res) => {
	const response = await fetch('http://localhost:5000/socket')
		.then(res => res);
	const data = await response.text();

	console.log(`Answer code: ${response.status}`);
	console.log(`Answer message: ${response.statusText}`);
	console.log(`Data: ${data}`);
	res.end();
})

app.get('/2', async (req, res) => {
	const response = await fetch('http://localhost:5000/socket')
		.then(res => res);

	console.log(`Answer code: ${response.status}`);
	console.log(`Params: ${JSON.stringify(req.query)}`);

	res.end();
})


app.post('/3', async (req, res) => {
	try {
		const response = await fetch('http://localhost:5000/socket');

		console.log(`Answer code: ${response.status}`);
		console.log(`Body Params: ${JSON.stringify(req.body)}`);

		res.end();
	} catch (error) {
		console.error('Error fetching data:', error);
		res.status(500)
		   .send('Error occurred');
	}
});


app.post('/4', async (req, res) => {
	const requestData = {
		"__comment": "Запрос. Лабораторная работа 8/10",
		"x": 1,
		"y": 2,
		"s": "Сообщение",
		"m": ["a", "b", "c", "d"],
		"o": { "surname": "Коломейчук", "name": "Арсений" }
	};

	try {
		const response = await fetch('http://localhost:5000/json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestData)
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const responseData = await response.json();
		console.log(`Response: ${JSON.stringify(responseData, null, 2)}`);
	} catch (error) {
		console.error('Error:', error);
	} finally {
		res.send();
	}
});


app.post('/5', async (req, res) => {
	const xmlData = `
		<request id="28">
		  <x value="1"/>
		  <x value="2"/>
		  <m value="a"/>
		  <m value="b"/>
		  <m value="c"/>
		</request>
  	`;

	try {
		const response = await fetch('http://localhost:5000/xml', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/xml'
			},
			body: xmlData
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const responseText = await response.text();
		console.log(`Response: ${responseText}`);
	} catch (error) {
		console.error('Error:', error);
	}
});


app.get('/6', async (req, res) => {
	const filePath = path.join(__dirname, 'MyFile.txt');
	await sendFile(req, res, filePath);
});


app.get('/7', async (req, res) => {
	const filePath = path.join(__dirname, 'MyFile.jpg');
	await sendFile(req, res, filePath);
});


app.get('/8', async (req, res) => {
	const data = await fetch('http://localhost:5000/download');
	const blob = await data.blob();
	console.log(await blob.text())

	res.send();
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});


async function sendFile(req, res, filePath) {
	const fileBuffer = fs.readFileSync(filePath);
	const formData = new FormData();
	formData.append('file', new Blob([fileBuffer]), filePath.split('/')
															.at(-1));

	try {
		const response = await fetch('http://localhost:5000/file', {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const responseData = await response.text();
		console.log(`Response: ${responseData}`);
		res.send('File sent successfully');
	} catch (error) {
		console.error('Error:', error);
		res.status(500)
		   .send('Error occurred');
	}
}
