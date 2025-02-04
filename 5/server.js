const express = require('express');
const DB = require('./db');
const path = require('path');
const readline = require('readline');
const app = express();
const port = 5000;
const db = new DB();

let shutdownTimeout = null;
let commitInterval = null;
let statsInterval = null;
let requestCount = 0;
let commitCount = 0;
let stats = {
    startTime: null,
    endTime: null,
    requestCount: 0,
    commitCount: 0
};

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/db', (req, res) => {
    res.json(db.select());
    requestCount++;
});

app.post('/api/db', (req, res) => {
    try {
        const newRow = db.insert(req.body);
        res.json(newRow);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    requestCount++;
});

app.put('/api/db', (req, res) => {
    try {
        const updatedRow = db.update(req.body);
        res.json(updatedRow);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
    requestCount++;
});

app.delete('/api/db', (req, res) => {
    const id = parseInt(req.query.id);
    try {
        const deletedRow = db.delete(id);
        res.json(deletedRow);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
    requestCount++;
});

app.get('/api/ss', (req, res) => {
    res.json(stats);
});

function scheduleShutdown(seconds) {
    if (shutdownTimeout) {
        clearTimeout(shutdownTimeout);
        console.log('Previous shutdown cancelled.');
    }
    if (seconds) {
        console.log(`Server will shut down in ${seconds} seconds.`);
        shutdownTimeout = setTimeout(() => {
            console.log('Shutting down server...');
            server.close();
        }, seconds * 1000);
    }
}

function scheduleCommit(interval) {
    if (commitInterval) {
        clearInterval(commitInterval);
        console.log('Periodic commit stopped.');
    }
    if (interval) {
        console.log(`Commits will execute every ${interval} seconds.`);
        commitInterval = setInterval(() => {
            db.commit();
            commitCount++;
        }, interval * 1000);
        commitInterval.unref();
    }
}

function startStatsCollection(duration) {
    if (statsInterval) {
        clearInterval(statsInterval);
        stats.endTime = new Date();
        console.log('Stats collection stopped.');
    }
    if (duration) {
        console.log(`Stats collection started for ${duration} seconds.`);
        stats.startTime = new Date();
        stats.endTime = null;
        stats.requestCount = 0;
        requestCount = 0;
        stats.commitCount = 0;
        statsInterval = setInterval(() => {
            stats.endTime = new Date();
            stats.requestCount = requestCount;
            stats.commitCount = commitCount;
        }, duration * 1000);
        statsInterval.unref();
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    const [command, value] = input.trim().split(' ');

    switch (command) {
        case 'sd':
            scheduleShutdown(parseInt(value));
            break;
        case 'sc':
            scheduleCommit(parseInt(value));
            break;
        case 'ss':
            startStatsCollection(parseInt(value));
            break;
        default:
            console.log('Unknown command');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
