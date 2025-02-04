const express = require('express');
const DB = require('./db');
const path = require('path');
const app = express();
const port = 5000;
const db = new DB();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/db', (req, res) => {
    res.json(db.select());
});

app.post('/api/db', (req, res) => {
    try {
        const newRow = db.insert(req.body);
        res.json(newRow);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/db', (req, res) => {
    try {
        const updatedRow = db.update(req.body);
        res.json(updatedRow);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.delete('/api/db', (req, res) => {
    const id = parseInt(req.query.id);
    try {
        const deletedRow = db.delete(id);
        res.json(deletedRow);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
