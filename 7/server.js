const express = require('express');
const path = require('path');
const fileHandler = require('./modules/m07-01');

const app = express();
const port = 5000;

const staticDir = path.join(__dirname, 'static');

app.use(fileHandler(staticDir));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
