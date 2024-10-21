const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "rahman@123", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
  port: 5432,
});

module.exports = sequelize;
