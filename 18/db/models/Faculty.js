const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize.config');

const Faculty = sequelize.define('FACULTY', {
    FACULTY: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    FACULTY_NAME: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'FACULTY',
    timestamps: false
});

module.exports = Faculty;