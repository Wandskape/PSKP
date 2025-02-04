const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

app.get('/jquery', (req, res) => {
  res.sendFile(path.join(__dirname, 'jquery.html'));
});

app.get('/api/name', (req, res) => {
  res.type('text/plain');
  res.send('Коломейчук Арсений Алексеевич');
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
