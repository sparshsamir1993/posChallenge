let Sequelize = require("sequelize");
const config = require("./config/config");
const Op = Sequelize.Op;
const operatorsAliases = {
  $gt: Op.gt,
};

let sequelize;
let env = process.env.NODE_ENV || "development";
if (env === "development") {
  sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
      host: config.development.host,
      dialect: config.development.dialect,
      operatorsAliases,
    }
  );
}
module.exports = sequelize;
global.sequelize = sequelize;
