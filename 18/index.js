require('dotenv').config();
const http = require('http');
const { initializeDatabase } = require('./db');
const handleRoutes = require('./routes');
const sequelize = require('./db/sequelize.config');
const controller = require('./controller');

initializeDatabase().then(() => {
    const server = http.createServer(async (req, res) => {
        try {
            if (['POST', 'PUT'].includes(req.method)) {
                let body = '';
                req.on('data', chunk => body += chunk.toString());

                req.on('error', err => {
                    console.error('Request body error:', err);
                    controller.handleError(res, err);
                });

                await new Promise((resolve, reject) => {
                    req.on('end', resolve);
                    req.on('error', reject);
                });

                try {
                    req.body = body ? JSON.parse(body) : {};
                } catch (e) {
                    return controller.sendResponse(res, 400, { error: 'Invalid JSON' });
                }
            }

            handleRoutes(req, res);
        } catch (err) {
            controller.handleError(res, err);
        }
    });

    const PORT = process.env.SERVER_PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    process.on('SIGINT', async () => {
        console.log('\nClosing server...');
        await sequelize.close();
        server.close(() => {
            console.log('Server closed');
            process.exit(0);
        });
    });
}).catch(error => {
    console.error('Failed to start server:', error);
});