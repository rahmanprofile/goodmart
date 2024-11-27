require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
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


const startApplication = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`database is running on ${PORT}`);
    });
  } catch (__) {
    console.log(`failed due to ${__.message}`);
  }
}

startApplication();