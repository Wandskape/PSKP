const express = require('express');
const path = require('path');
const fs = require('fs');
const WebSocket = require('ws'); 
const chokidar = require('chokidar');

const app = express();
const port = 5000;

const StudentJSON = 'StudentList.json';
const backupDir = path.join(__dirname, 'backup');

app.use(express.json());

app.get('/', (req, res)=>{
    const jsonObj = JSON.parse(fs.readFileSync(StudentJSON, 'utf8'));
    res.json(jsonObj);
})

app.get('/:n(\\d+)', (req, res) => {
    const n = parseInt(req.params.n);
    if (!isNaN(n)) {
        fs.readFile(StudentJSON, 'utf8', (err, data) => {
            if (err) {
                console.error('Ошибка чтения файла:' + path.dirname(StudentJSON), err);
                res.status(500).send('Ошибка сервера');
                return;
            }

            try {
                const allStudents = JSON.parse(data);

                const searchParam = n;
                const searchKey = 'id';

                const StudentN = allStudents.find(obj => obj[searchKey] === searchParam);

                if (StudentN) {
                    res.json(StudentN);
                } else {
                    const error = {'error':1, 'message': `студент с id равным ${n} не найден`};
                    res.json(error);
                }
            } catch (parseError) {
                console.error('Ошибка парсинга JSON:', parseError);
                res.status(500).send('Ошибка сервера');
            }
        });
    } else {
        res.status(400).send("Невалидное значение ID");
    }
});

app.post('/', (req, res)=>{
    const {id, name, bday, specility} = req.body;
    fs.readFile(StudentJSON, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения файла:' + path.dirname(StudentJSON), err);
            res.status(500).send('Ошибка сервера');
            return;
        }

        try {
            const allStudents = JSON.parse(data);
            
            const newStudentID = parseInt(id);
            const searchParam = newStudentID;
            const searchKey = 'id';

            const StudentN = allStudents.find(obj => obj[searchKey] === searchParam);

            if (StudentN) {
                const error = {'error': 3, 'message': `студент с id равным ${newStudentID} уже есть`};
                res.json(error);
            } else {
                const newStudent = {'id':newStudentID, 'name':name, 'bday': bday, 'specility':specility}

                allStudents.push(newStudent);
                fs.writeFile(StudentJSON, JSON.stringify(allStudents, null, 2), err => {
                    if(!err){
                        res.json(newStudent);
                    }
                    else{
                        console.error('Ошибка записи в файл:', err);
                    }
                })
            }
        } catch (parseError) {
            console.error('Ошибка парсинга JSON:', parseError);
            res.status(500).send('Ошибка сервера');
        }
    });
})

app.put('/', (req, res) => {
    const {id, name, bday, specility} = req.body;
    fs.readFile(StudentJSON, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения файла:' + path.dirname(StudentJSON), err);
            res.status(500).send('Ошибка сервера');
            return;
        }

        try {
            const allStudents = JSON.parse(data);
            
            const modifyStudentID = parseInt(id);
            const searchParam = modifyStudentID;
            const searchKey = 'id';

            const StudentN = allStudents.find(obj => obj[searchKey] === searchParam);

            if (StudentN) {
                const modifyStudent = {'id':modifyStudentID, 'name':name, 'bday': bday, 'specility':specility}

                allStudents[modifyStudentID] = modifyStudent;
                fs.writeFile(StudentJSON, JSON.stringify(allStudents, null, 2), err => {
                    if(!err){
                        res.json(modifyStudent);
                    }
                    else{
                        console.error('Ошибка записи в файл:', err);
                    }
                })
            } else {
                const error = {'error':1, 'message': `студент с id равным ${modifyStudentID} не найден`};
                res.json(error);
            }
        } catch (parseError) {
            console.error('Ошибка парсинга JSON:', parseError);
            res.status(500).send('Ошибка сервера');
        }
    });
})

app.delete('/:d', (req, res) => {
    const d = parseInt(req.params.d);
    fs.readFile(StudentJSON, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения файла:' + path.dirname(StudentJSON), err);
            res.status(500).send('Ошибка сервера');
            return;
        }

        try {
            const allStudents = JSON.parse(data);
            
            const deleteStudentID = parseInt(d);
            const searchParam = deleteStudentID;
            const searchKey = 'id';

            const StudentN = allStudents.find(obj => obj[searchKey] === searchParam);

            if (StudentN) {

                const updatedStudents = allStudents.filter(obj => obj[searchKey] !== searchParam);
                fs.writeFile(StudentJSON, JSON.stringify(updatedStudents, null, 2), err => {
                    if(!err){
                        res.json(StudentN);
                    }
                    else{
                        console.error('Ошибка записи в файл:', err);
                    }
                })
            } else {
                const error = {'error':1, 'message': `студент с id равным ${deleteStudentID} не найден`};
                res.json(error);
            }
        } catch (parseError) {
            console.error('Ошибка парсинга JSON:', parseError);
            res.status(500).send('Ошибка сервера');
        }
    });
})

app.post('/backup', (req, res) => {
    setTimeout(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;
        const backupFileName = `${timestamp}_StudentList.json`;
        const sourceFile = 'StudentList.json';
        const destinationFile = path.join(backupDir, backupFileName);

        fs.copyFile(sourceFile, destinationFile, (err) => {
            if (err) {
                console.error('Ошибка копирования файла:', err);
                res.status(500).send('Ошибка копирования файла');
                return;
            }
            res.json({ message: 'Резервная копия создана', backupFileName: backupFileName });
        });
    }, 2000);
});

app.delete('/backup/:date', (req, res) => {
    const inputDate = req.params.date;
    const year = parseInt(inputDate.substring(0, 4));
    const day = parseInt(inputDate.substring(4, 6));
    const month = parseInt(inputDate.substring(6, 8)) - 1;

    const cutoffDate = new Date(year, month, day);

    fs.readdir(backupDir, (err, files) => {
        if (err) {
            console.error('Ошибка чтения каталога:', err);
            res.status(500).send('Ошибка чтения каталога');
            return;
        }

        const backupFiles = files.filter(file => {
            const match = file.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})_StudentList\.json$/);
            if (match) {
                const fileYear = parseInt(match[1]);
                const fileMonth = parseInt(match[2]) - 1;
                const fileDay = parseInt(match[3]);
                const fileDate = new Date(fileYear, fileMonth, fileDay);
                return fileDate < cutoffDate;
            }
            return false;
        });

        if (backupFiles.length === 0) {
            res.json({ message: 'Нет файлов для удаления' });
            return;
        }

        let deleteCount = 0;
        backupFiles.forEach(file => {
            const filePath = path.join(backupDir, file);
            fs.unlink(filePath, err => {
                if (err) {
                    console.error('Ошибка удаления файла:', err);
                } else {
                    deleteCount++;
                }

                if (deleteCount === backupFiles.length) {
                    res.json({ message: `${deleteCount} файлы(ов) удалены` });
                }
            });
        });
    });
});

app.get('/backup', (req, res) => {
    fs.readdir(backupDir, (err, files) => {
        if (err) {
            console.error('Ошибка чтения каталога:', err);
            res.status(500).send('Ошибка чтения каталога');
            return;
        }

        if (files.length === 0) {
            res.json({ message: 'Нет файлов бакапа' });
            return;
        }
        else{
            let id = 0;
            const backupList = [];
            files.forEach(file => {
                const filePath = path.join(backupDir, file);
                const currBackup = {'filePath': filePath, 'idBackup':id};
                backupList.push(currBackup);
                id++;
            });
            res.json(backupList);
        }
    });
});

const wss = new WebSocket.Server({ port: 8080 });

const watcher = chokidar.watch(backupDir, {
    persistent: true
});

watcher.on('change', (filePath) => {
    if (filePath.includes('_StudentList.json')) {
        const notification = `Файл ${path.basename(filePath)} был изменен.`;
        console.log(`Файл ${path.basename(filePath)} был изменен.`);
        wss.clients.forEach(client => {
            console.log("поехала на клиентов");
            if (client.readyState === WebSocket.OPEN) {
                client.send(notification);
                console.log("должно было доехать до клиентов");
            }
        });
    }
});

wss.on('connection', (ws) => {
    console.log('Подключен новый клиент');
    ws.send('Вы успешно подключились к серверу уведомлений.');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});