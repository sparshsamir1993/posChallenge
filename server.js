const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const sequelize = require("./db.js");
const passport = require("passport");
require("./services/passport");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const corsOptions = {
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  origin: [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5050",
    "*",
  ],
  credentials: true,
  exposedHeaders: [
    "Access-Control-Allow-Origin",
    "Content-Length",
    "token",
    "authorization",
    "Authorization",
    "refresh-token",
  ],
};
let dbStore = new SequelizeStore({
  db: sequelize,
});
const app = express();
app.use(cors(corsOptions));
app.use(
  session({
    key: "user_sid",
    secret: "keyboard cat",
    store: dbStore,
    proxy: true, // if you do SSL outside of node.
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
      secure: false,
    },
  })
);
dbStore.sync();

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
let routes = require("./routes/index");

app.use("/api", routes);
module.exports = app;
