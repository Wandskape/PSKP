const dataStore = {
    tasks: [
        { id: 1, name: 'Eating' },
        { id: 2, name: 'Sleeping' },
        { id: 3, name: 'What else do you need?' }
    ]
};

module.exports = {
    getAlltasks: () => dataStore.tasks,
    getTasksById: (id) => dataStore.tasks.find(u => u.id === id),
    createTasks: (name) => {
        const newTasks = {
            id: dataStore.tasks.length > 0
                ? Math.max(...dataStore.tasks.map(u => u.id)) + 1
                : 1,
            name: name
        };
        dataStore.tasks.push(newTasks);
        return newTasks;
    },
    updateTasks: (id, name) => {
        const Tasks = dataStore.tasks.find(u => u.id === id);
        if (Tasks) {
            Tasks.name = name;
            return Tasks;
        }
        return null;
    },
    deleteTasks: (id) => {
        const index = dataStore.tasks.findIndex(u => u.id === id);
        if (index !== -1) {
            return dataStore.tasks.splice(index, 1)[0];
        }
        return null;
    }
};