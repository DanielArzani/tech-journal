// Dependencies
const express = require("express");
const path = require("path");
const sequelize = require("./config/connection");
// Will automatically search for index.js
const routes = require("./controllers");
const { create } = require("express-handlebars");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");

// Variables
const app = express();
const hbs = create({ helpers });
const PORT = process.env.PORT || 3000;
// If you wish to use this app then remember to store you session secret key in an .env file
const sess = {
  secret: "invisible secret key",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Register hbs to work with express and set view engine to look for handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));
app.use(routes);

// Turn on connection to DB and Server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
  });
});
