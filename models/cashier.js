"use strict";
const Sequelize = require("sequelize");
module.exports = sequelize.define("Cashier", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  creditLimit: Sequelize.INTEGER,
});
