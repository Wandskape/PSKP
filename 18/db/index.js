const sequelize = require('./sequelize.config');
const Faculty = require('./models/Faculty');
const Pulpit = require('./models/Pulpit');
const Subject = require('./models/Subject');
const AuditoriumType = require('./models/AuditoriumType');
const Auditorium = require('./models/Auditorium');

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Database connection established');

        await sequelize.sync({ force: false, alter: true });
        console.log('Database synchronized');
    } catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
}

module.exports = {
    sequelize,
    initializeDatabase,
    Faculty,
    Pulpit,
    Subject,
    AuditoriumType,
    Auditorium
};