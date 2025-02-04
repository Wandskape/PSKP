const express = require('express');
const app = express();
const port = 5000;

app.get('/api/name', (req, res) => {
  res.type('text/plain');
  res.send('Коломейчук Арсений Алексеевич');
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
