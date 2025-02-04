const express = require('express');
const path = require('path');
const http = require('http');
const xml2js = require('xml2js');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');

const app = express();
const server = http.createServer(app);
const port = 5001;

const staticDir = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: 'application/xml' }));

server.KeepAliveTimeout = 5000;

// 1
app.get('/connection', (req, res) =>{
    res.send(`текущее значение KeepAliveTimeout ${server.KeepAliveTimeout}ms`);
})

app.get('/connection/set=:set', (req, res) => {
    const newTimeoutValue = parseInt(req.params.set, 10);

    if(isNaN(newTimeoutValue) || newTimeoutValue < 0){
        res.sendStatus(404).send('Невалидное значение параметра');
    }
    
    server.KeepAliveTimeout = newTimeoutValue;
    res.send(`Новое значение ${server.KeepAliveTimeout}ms`)
})

// 2
app.get('/headers', (req, res) => {
    const requestHeaders = req.headers;

    res.setHeader('Custom-header', 'CustomValue');
    res.setHeader('Content-Type', 'application/json');

    const responseHeaders = {
        'Custom-header': res.getHeader('Custom-header'),
        'Content-Type': res.getHeader('Content-Type')
    }

    const headerInfo = {
        requestHeaders: requestHeaders,
        responseHeaders: responseHeaders
    }

    res.json(headerInfo);
})

// 3
// app.get('/parameter', (req, res) => {
//     const x = parseFloat(req.query.x);
//     const y = parseFloat(req.query.y);

//     if(!isNaN(x) && !isNaN(y)){
//         const sum = x + y;
//         const diff = x - y;
//         const prod = x * y;
//         const quot = y !== 0 ? (x / y).toFixed(2) : 'На ноль делить нельзя';

//         res.send(`Сумма: ${sum}, Разность: ${diff}, Произведение: ${prod}, Частное: ${quot}`);
//     }
//     else{
//         res.sendStatus(400).send("Невалидные значения чисел");
//     }

// })

// 4
app.get('/parameter/:x/:y', (req, res) => {
    const x = parseFloat(req.params.x);
    const y = parseFloat(req.params.y);

    if(!isNaN(x) && !isNaN(y)){
        const sum = x + y;
        const diff = x - y;
        const prod = x * y;
        const quot = y !== 0 ? (x / y).toFixed(2) : 'На ноль делить нельзя';

        res.send(`Сумма: ${sum}, Разность: ${diff}, Произведение: ${prod}, Частное: ${quot}`);
    }
    else{
        res.sendStatus(400).send("Невалидные значения чисел");
    }
})

//5
app.get('/close', (req, res) => {
    res.send("Сервер остановится через 1 секунд")
    setTimeout(()=>{
        server.close()
    }, 1000);
})

//6
app.get('/soket', (req, res) => {

    const clientIP = req.connection.remoteAddress
    const clientPort = req.connection.remotePort;

    const serverIP = req.connection.localAddress;
    const severPort = req.connection.localPort;

    res.send(`clientIP ${clientIP} clientPort ${clientPort} serverIP ${serverIP} severPort ${severPort}`);
})

//7
app.get('/req-data', (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        console.log(`Получен кусок данных: ${chunk.length} байт`);
        body += chunk;
    });

    req.on('end', () => {
        console.log('Данные полностью получены');
        res.send(`Данные получены: ${body.length} символов`);
    });

    req.on('error', (err) => {
        console.error('Ошибка обработки данных', err);
        res.status(500).send('Ошибка обработки данных');
    });

})

//8
app.get('/resp-status', (req, res) => {
    serverStatus = req.query.code;
    serverStatusMessange = req.query.mess;

    res.statusCode = serverStatus;
    res.statusMessage = serverStatusMessange;

    res.send();
})

//9
app.get('/formparameter', (req, res) => {
    res.sendFile(path.join(staticDir, 'index.html'));
})

app.post('/formparameter', (req, res) => {
    const { name, age, birthdate, subscribe, gender, comments } = req.body;

    const responseData = {
        name,
        age,
        birthdate,
        subscribe: subscribe === 'on' ? 'Подписан' : 'Не подписан',
        gender,
        comments
    };

    res.json(responseData);
});

//10
app.post('/json', (req, res) => {
    const { __comment, x, y, s, m, o } = req.body;

    const x_plus_y = x + y;
    const Concatination_s_o = `${s} ${o.surname}, ${o.name}`;
    const Lenght_m = m.length;


    const responseData = {
        "__comment": __comment,
        "x_plus_y": x_plus_y,
        "Concatination_s_o": Concatination_s_o,
        "Lenght_m": Lenght_m
    };

    res.json(responseData);
})

//11
app.post('/xml', (req, res) => {
    const xml = req.body;

    xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
        if (err) {
            return res.status(400).send('Неправильный XML-формат');
        }

        const requestId = result.reques.$.id;

        const xValues = Array.isArray(result.reques.x)
            ? result.reques.x.map(el => parseInt(el.$.value))
            : [parseInt(result.reques.x.$.value)];

        const mValues = Array.isArray(result.reques.m)
            ? result.reques.m.map(el => el.$.value)
            : [result.reques.m.$.value];

        const sumX = xValues.reduce((acc, val) => acc + val, 0);

        const concatM = mValues.join('');

        const builder = new xml2js.Builder({ headless: true });
        const responseObj = {
            response: {
                $: { id: '33', request: requestId },
                sum: {
                    $: { element: 'x', result: sumX.toString() }
                },
                concat: {
                    $: { element: 'm', result: concatM }
                }
            }
        };
        const responseXml = builder.buildObject(responseObj);

        res.set('Content-Type', 'application/xml');
        res.send(responseXml);
    });
});

//12
app.get('/files', (req, res) => {
    fs.readdir(staticDir, (err, files) => {
        const fileCount = files.filter(file => fs.lstatSync(path.join(staticDir, file)).isFile()).length;

        res.setHeader('X-static-files-count', fileCount);

        res.send(`Количество файлов в директории: ${fileCount}`);
    });
});

//13
app.get('/files/:filename', (req, res)=>{
    const filename = req.params.filename;
    const filePath = path.join(staticDir, filename);

    fs.stat(filePath, (err,stat)=>{
        if(err || !stat.isFile()){
            res.sendStatus(404).send("Файл не найден");
        }

        res.sendFile(filePath);
    })
})

//14
app.get('/upload', (req, res)=>{
    res.send(`
    <h2>Загрузите файл</h2>
    <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="file" />
        <button type="submit">Загрузить</button>
    </form>`);
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, staticDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res)=>{
    if (!req.file) {
        return res.status(400).send('Файл не был загружен');
    }

    res.send(`Файл ${req.file.originalname} успешно загружен в директорию static`);
})

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});