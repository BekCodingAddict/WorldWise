require("dotenv").config();
const express = require("express");
const app = express();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 10000;
const usersRoute = require("./routes/usersRoute");
app.use(express.json());

app.use("/api/users", usersRoute);
app.listen(port, () => console.log("Server listening on port: " + port + "!"));
