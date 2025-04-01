require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const { pool, poolConnect } = require('./db/db.pool');
const handleApiRoutes = require('./routes');

const server = http.createServer(async (req, res) => {
  try {
    await poolConnect;

    if (req.method === 'POST' || req.method === 'PUT') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        try {
          req.body = body ? JSON.parse(body) : {};
          handleApiRoutes(req, res);
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      return;
    }

    handleApiRoutes(req, res);

  } catch (err) {
    console.error('Server error:', err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Server error' }));
  }
});


const PORT = process.env.SERVER_PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', async () => {
  console.log('Closing server and database pool...');
  await pool.close();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});