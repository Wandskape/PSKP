function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                reject(new Error('Invalid JSON format'));
            }
        });
        req.on('error', reject);
    });
}

function sendResponse(res, statusCode, data, contentType = 'application/json') {
    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.end(contentType === 'application/json' ? JSON.stringify(data) : data);
}

function handleError(res, err) {
    console.error('Server Error:', err);
    sendResponse(res, 500, {
        error: 'Internal Server Error',
        message: err.message
    });
}

module.exports = { parseBody, sendResponse, handleError };