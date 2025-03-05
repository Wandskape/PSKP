const http = require('http');
const path = require('path');
const fs = require('fs');
const WebSocket = require('ws');
const chokidar = require('chokidar');
const url = require('url');

const port = 5000;
const StudentJSON = 'StudentList.json';
const backupDir = path.join(__dirname, 'backup');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;
    res.setHeader('Content-Type', 'application/json');

    if (pathname === '/') {
        if (method === 'GET') {
            fs.readFile(StudentJSON, 'utf8', (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'Ошибка чтения файла' }));
                    return;
                }
                res.statusCode = 200;
                res.end(data);
            });
        } else if (method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk;
            });
            req.on('end', () => {
                const { id, name, bday, specility } = JSON.parse(body);
                console.log(id)
                if(id === undefined){
                    res.end(JSON.stringify({ error: `Id не может быть null ${id}` }));
                    return;
                }
                fs.readFile(StudentJSON, 'utf8', (err, data) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end(JSON.stringify({ error: 'Ошибка чтения файла' }));
                        return;
                    }

                    const allStudents = JSON.parse(data);
                    const newStudentID = parseInt(id);
                    const StudentN = allStudents.find(obj => obj.id === newStudentID);

                    if (StudentN) {
                        res.statusCode = 400;
                        res.end(JSON.stringify({ error: 3, message: `студент с id равным ${newStudentID} уже есть` }));
                    } else {
                        const newStudent = { id: newStudentID, name, bday, specility };
                        allStudents.push(newStudent);
                        fs.writeFile(StudentJSON, JSON.stringify(allStudents, null, 2), err => {
                            if (err) {
                                res.statusCode = 500;
                                res.end(JSON.stringify({ error: 'Ошибка записи в файл' }));
                            } else {
                                res.statusCode = 201;
                                res.end(JSON.stringify(newStudent));
                            }
                        });
                    }
                });
            });
        } else if (method === 'PUT') {
            let body = '';
            req.on('data', chunk => {
                body += chunk;
            });
            req.on('end', () => {
                const { id, name, bday, specility } = JSON.parse(body);
                if(id === undefined || null){
                    res.end(JSON.stringify({ error: `Id не может быть null ${id}` }));
                    return;
                }
                fs.readFile(StudentJSON, 'utf8', (err, data) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end(JSON.stringify({ error: 'Ошибка чтения файла' }));
                        return;
                    }

                    let allStudents = JSON.parse(data);
                    const index = allStudents.findIndex(obj => obj.id === id);
                    if (index !== -1) {
                        allStudents[index] = { id, name, bday, specility };
                        fs.writeFile(StudentJSON, JSON.stringify(allStudents, null, 2), err => {
                            if (err) {
                                res.statusCode = 500;
                                res.end(JSON.stringify({ error: 'Ошибка записи в файл' }));
                            } else {
                                res.statusCode = 200;
                                res.end(JSON.stringify(allStudents[index]));
                            }
                        });
                    } else {
                        res.statusCode = 404;
                        res.end(JSON.stringify({ error: 2, message: `студент с id равным ${id} не найден` }));
                    }
                });
            });
        }
    } else if (pathname.match(/^\/\d+$/)) {
        const n = parseInt(pathname.split('/')[1]);
        if (method === 'GET') {
            fs.readFile(StudentJSON, 'utf8', (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'Ошибка чтения файла' }));
                    return;
                }

                const allStudents = JSON.parse(data);
                const StudentN = allStudents.find(obj => obj.id === n);

                if (StudentN) {
                    res.statusCode = 200;
                    res.end(JSON.stringify(StudentN));
                } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ error: 1, message: `студент с id равным ${n} не найден` }));
                }
            });
        } else if (method === 'DELETE') {
            fs.readFile(StudentJSON, 'utf8', (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'Ошибка чтения файла' }));
                    return;
                }

                const allStudents = JSON.parse(data);
                const StudentN = allStudents.find(obj => obj.id === n);

                if (StudentN) {
                    const updatedStudents = allStudents.filter(obj => obj.id !== n);
                    fs.writeFile(StudentJSON, JSON.stringify(updatedStudents, null, 2), err => {
                        if (err) {
                            res.statusCode = 500;
                            res.end(JSON.stringify({ error: 'Ошибка записи в файл' }));
                        } else {
                            res.statusCode = 200;
                            res.end(JSON.stringify(StudentN));
                        }
                    });
                } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ error: 1, message: `студент с id равным ${n} не найден` }));
                }
            });
        }
    } else if (pathname === '/backup' && method === 'GET') {
        fs.readdir(backupDir, (err, files) => {
            if (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({error: 'Ошибка чтения каталога'}));
                return;
            }
            res.statusCode = 200;
            res.end(JSON.stringify(files.filter(file => file.includes('_StudentList.json'))));
        })
    } else if (pathname === '/backup' && method === 'POST') {
        setTimeout(() => {
            const now = new Date();
            const timestamp = now.toISOString().replace(/[:\-T.]/g, '').slice(0, -4);
            const backupFileName = `${timestamp}_StudentList.json`;
            const destinationFile = path.join(backupDir, backupFileName);

            fs.copyFile(StudentJSON, destinationFile, (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'Ошибка копирования файла' }));
                } else {
                    res.statusCode = 200;
                    res.end(JSON.stringify({ message: 'Резервная копия создана', backupFileName }));
                }
            });
        }, 2000);
    } else if (pathname.startsWith('/backup/') && method === 'DELETE') {
        const dateStr = pathname.split('/')[2];
        if (!/\d{8}/.test(dateStr)) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Неверный формат даты' }));
            return;
        }

        fs.readdir(backupDir, (err, files) => {
            if (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Ошибка чтения каталога' }));
                return;
            }

            const filesToDelete = files.filter(file => {
                const match = file.match(/(\d{8})_StudentList\.json/);
                return match && match[1] < dateStr;
            });

            if (filesToDelete.length === 0) {
                res.statusCode = 404;
                res.end(JSON.stringify({ message: 'Нет файлов для удаления' }));
                return;
            }

            filesToDelete.forEach(file => fs.unlink(path.join(backupDir, file), () => {}));
            res.statusCode = 200;
            res.end(JSON.stringify({ message: 'Удалены файлы', files: filesToDelete }));
        });
    }
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Маршрут не найден' }));
    }
});

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Подключен новый клиент');
    ws.send('Вы успешно подключились к серверу уведомлений.');
});

const watcher = chokidar.watch(backupDir, {
    persistent: true
});

watcher.on('change', (filePath) => {
    const fileName = path.basename(filePath);
    console.log(`Файл ${fileName} был изменен.`);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(`Файл ${fileName} был изменен.`);
        }
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
