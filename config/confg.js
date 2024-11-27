const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "rahman@123", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
  port: 5432,
});

const startDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
  } catch (error) {
    console.log(`Failed DB connection due to: ${error.message}`);
  }
};

startDB();

module.exports = sequelize;
