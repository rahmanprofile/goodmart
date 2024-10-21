const sequelize = require('../config/confg');
const { DataTypes } = require('sequelize');
const UserModel = require('../model/users');

const followModel = sequelize.define('follow', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    followingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        defaultValue: 'pending',
    },
}, {
    timestamps: true,
});

followModel.belongsTo(UserModel, { as: 'follower', foreignKey: 'followerId' });
followModel.belongsTo(UserModel, { as: 'following', foreignKey: 'followingId' });

module.exports = followModel;
