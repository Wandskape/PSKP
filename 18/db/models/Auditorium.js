const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize.config');
const AuditoriumType = require('./AuditoriumType');

const Auditorium = sequelize.define('AUDITORIUM', {
    AUDITORIUM: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    AUDITORIUM_NAME: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    AUDITORIUM_CAPACITY: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    AUDITORIUM_TYPE: {
        type: DataTypes.STRING(10),
        references: {
            model: AuditoriumType,
            key: 'AUDITORIUM_TYPE'
        }
    }
}, {
    tableName: 'AUDITORIUM',
    timestamps: false
});

Auditorium.belongsTo(AuditoriumType, {
    foreignKey: 'AUDITORIUM_TYPE',
    as: 'AuditoriumTypeAssociation'
});

AuditoriumType.hasMany(Auditorium, {
    foreignKey: 'AUDITORIUM_TYPE',
    as: 'Auditoriums'
});

module.exports = Auditorium;