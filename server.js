const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
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
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());

module.exports = app;
