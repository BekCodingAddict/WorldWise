require("dotenv").config();
const express = require("express");
const app = express();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 10000;

app.listen(port, () => console.log("Server listening on port: " + port + "!"));
