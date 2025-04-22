const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_SERVER,
        port: parseInt(process.env.DB_PORT),
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: false,
                trustServerCertificate: true
            }
        },
        pool: {
            max: 10,
            min: 0,
            idle: 30000
        },
        logging: false
    }
);

module.exports = sequelize;