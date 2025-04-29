const TaskController = require('./controller');

const routingTable = [
    { path: '/', method: 'GET', action: TaskController.getAllTasks },
    { path: '/new', method: 'GET', action: TaskController.showCreateForm },
    { path: '/:id', method: 'GET', action: TaskController.getTasksById },
    { path: '/:id/edit', method: 'GET', action: TaskController.showEditForm },

    { path: '/api/tasks', method: 'GET', action: TaskController.apiGetAllTasks },
    { path: '/api/tasks/:id', method: 'GET', action: TaskController.apiGetTaskById },
    { path: '/api/tasks', method: 'POST', action: TaskController.apiCreateTask },
    { path: '/api/tasks/:id', method: 'PUT', action: TaskController.apiUpdateTask },
    { path: '/api/tasks/:id', method: 'DELETE', action: TaskController.apiDeleteTask }
];

function initialize(app) {
    routingTable.forEach(route => {
        app[route.method.toLowerCase()](route.path, route.action);
    });
}

module.exports = {
    initialize
};