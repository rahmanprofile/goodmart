const sequalize = require('../config/confg')
const DataTypes = require('sequelize');


const roles = sequalize.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


module.exports = roles;