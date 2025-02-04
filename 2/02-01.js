const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

app.get('/html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
