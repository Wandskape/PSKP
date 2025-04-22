const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize.config');
const Pulpit = require('./Pulpit');

const Subject = sequelize.define('SUBJECT', {
    SUBJECT: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    SUBJECT_NAME: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    PULPIT: {
        type: DataTypes.STRING(10),
        references: {
            model: Pulpit,
            key: 'PULPIT'
        }
    }
}, {
    tableName: 'SUBJECT',
    timestamps: false
});

Subject.belongsTo(Pulpit, {
    foreignKey: 'PULPIT',
    as: 'PulpitAssociation'
});

Pulpit.hasMany(Subject, {
    foreignKey: 'PULPIT',
    as: 'Subjects'
});

module.exports = Subject;