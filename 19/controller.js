const TasksModel = require('./model');
const path = require('path');

module.exports = {
    getAllTasks: (req, res) => {
        res.sendFile(path.join(__dirname, '../19/views/index.html'));
    },

    getTasksById: (req, res) => {
        res.sendFile(path.join(__dirname, '../19/views/detail.html'));
    },

    showCreateForm: (req, res) => {
        res.sendFile(path.join(__dirname, '../19/views/create.html'));
    },

    showEditForm: (req, res) => {
        res.sendFile(path.join(__dirname, '../19/views/update.html'));
    },

    apiGetAllTasks: (req, res) => {
        res.json(TasksModel.getAlltasks());
    },

    apiGetTaskById: (req, res) => {
        const Task = TasksModel.getTasksById(parseInt(req.params.id));
        if (Task) {
            res.json(Task);
        } else {
            res.status(404).json({ error: 'Tasks not found' });
        }
    },

    apiCreateTask: (req, res) => {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const Task = TasksModel.createTasks(name);
        res.status(201).json(Task);
    },

    apiUpdateTask: (req, res) => {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const Task = TasksModel.updateTasks(parseInt(req.params.id), name);
        if (Task) {
            res.json(Task);
        } else {
            res.status(404).json({ error: 'Tasks not found' });
        }
    },

    apiDeleteTask: (req, res) => {
        const Task = TasksModel.deleteTasks(parseInt(req.params.id));
        if (Task) {
            res.json({ message: 'Tasks deleted successfully' });
        } else {
            res.status(404).json({ error: 'Tasks not found' });
        }
    }
};