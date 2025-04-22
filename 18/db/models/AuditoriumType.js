const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize.config');

const AuditoriumType = sequelize.define('AUDITORIUM_TYPE', {
    AUDITORIUM_TYPE: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    AUDITORIUM_TYPENAME: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
}, {
    tableName: 'AUDITORIUM_TYPE',
    timestamps: false
});

module.exports = AuditoriumType;