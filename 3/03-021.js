const http = require('http');
const url = require('url');

function factorial(n) {
    return n === 0 ? 1 : n * factorial(n - 1);
}

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;

    if (req.url.startsWith('/fact')) {
        const k = parseInt(queryObject.k);
        const fact = factorial(k);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ k, fact }));
    } else if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
        <html>
        <body>
            <h1>Factorial Calculation Results</h1>
            <ul id="results"></ul>
            <script>
                const results = document.getElementById('results');
                let start = Date.now();

                // Цикл для отправки запросов
                for (let x = 1; x <= 20; x++) {
                    fetch(\`/fact?k=\${x}\`)
                    .then(response => response.json())
                    .then(data => {
                        let elapsed = Date.now() - start;
                        let li = document.createElement('li');
                        li.textContent = \`\${x}. Result:\${elapsed}-\${x}/\${data.fact}\`;
                        results.appendChild(li);
                    })
                    .catch(error => console.error('Ошибка:', error));
                }
            </script>
        </body>
        </html>
        `);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Not Found</h1>');
    }
});

server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});

function factorialAsync(n, callback) {
    if (n === 0) {
        process.nextTick(() => callback(1));
    } else {
        factorialAsync(n - 1, (result) => {
            process.nextTick(() => callback(n * result));
        });
    }
}

function factorialAsync(n, callback) {
    if (n === 0) {
        setImmediate(() => callback(1));
    } else {
        factorialAsync(n - 1, (result) => {
            setImmediate(() => callback(n * result));
        });
    }
}

