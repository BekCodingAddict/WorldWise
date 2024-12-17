require("dotenv").config();
const express = require("express");
const app = express();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 10000;
const usersRoute = require("./routes/usersRoute");

app.use(express.json());
app.use("/api/users", usersRoute);
app.use(express.static(`${__dirname}/client/dist`));

//rendering client for any path
app.get("*", (req, res) => res.sendFile(`${__dirname}/client/dist/index.html`));

app.listen(port, () => console.log("Server listening on port: " + port + "!"));
