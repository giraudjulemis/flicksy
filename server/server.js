const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
require("dotenv").config();

const routes = require("./routes");

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri);

app.use(bodyParser.json());
app.use(xss());
app.use(mongoSanitize());
app.use("/api", routes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on ${port}...`);
});
