const DataTypes = require('sequelize');
const sequalize = require('../config/confg');

const subcategories = sequalize.define('subcategories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


module.exports = subcategories;