// Dependencies
const express = require("express");
const path = require("path");
const sequelize = require("./config/connection");
// Will automatically search for index.js
const routes = require("./controllers");

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// Turn on connection to DB and Server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
  });
});
