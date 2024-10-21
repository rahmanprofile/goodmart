const sequelize = require('../config/confg')
const { DataTypes } = require('sequelize');

const categoryModel = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


module.exports = categoryModel;