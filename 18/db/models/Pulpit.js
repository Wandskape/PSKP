const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize.config');
const Faculty = require('./Faculty');

const Pulpit = sequelize.define('PULPIT', {
    PULPIT: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    PULPIT_NAME: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    FACULTY: {
        type: DataTypes.STRING(10),
        references: {
            model: Faculty,
            key: 'FACULTY'
        }
    }
}, {
    tableName: 'PULPIT',
    timestamps: false
});

Pulpit.belongsTo(Faculty, {
    foreignKey: 'FACULTY',
    as: 'FacultyAssociation'
});

Faculty.hasMany(Pulpit, {
    foreignKey: 'FACULTY',
    as: 'Pulpits'
});

module.exports = Pulpit;