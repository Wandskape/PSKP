const fs = require('fs');
const path = require('path');

module.exports = function (staticDir) {
    return function (req, res) {
        if (req.method !== 'GET') {
            res.status(405).send('Method Not Allowed');
            return;
        }

        const filePath = path.join(staticDir, req.url);
        const ext = path.extname(filePath).toLowerCase();

        const mimeTypes = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'text/javascript',
            '.png': 'image/png',
            '.docx': 'application/msword',
            '.json': 'application/json',
            '.xml': 'application/xml',
            '.mp4': 'video/mp4',
        };

        if (!mimeTypes[ext]) {
            res.status(404).send('File not found or unsupported extension');
            return;
        }

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.status(404).send('File not found');
            } else {
                res.setHeader('Content-Type', mimeTypes[ext]);
                res.send(data);
            }
        });
    };
};
