require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/confg");
const router = require('./routes/routes');
const PORT = process.env.DB_PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use('/', router);

app.use("/", (req, res, next) => {
  res.status(200).json({
    message: "Hurray! You're connected to the internet.",
  });
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized!');
  })
  .catch((error) => {
    console.error('Failed to synchronize database:', error);
  });

app.listen(PORT, () => { 
  console.log(`database is running on ${PORT}`);
});