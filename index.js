const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const http = require("http");
const server = http.Server(app);
require("dotenv/config");

app.use(expressLayouts);
app.set("view engine", "ejs");

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//Route Imports

//ROUTES
app.use("/", require("./routes/genRoute"));

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to DB")
);

//server-listen
app.listen(PORT);
