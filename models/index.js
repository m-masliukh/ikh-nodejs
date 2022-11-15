const dotenv = require('dotenv');
const Sequelize = require("sequelize");

dotenv.config();

const sequelize = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PASSWORD, {
    host: process.env.SQL_SERVER,
    //port: dbConfig.PORT,
    dialect: process.env.DIALECT
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.proposals = require("./proposal.model.js")(sequelize, Sequelize);
db.contacts = require("./contact.model.js")(sequelize, Sequelize);
db.news = require("./news.model.js")(sequelize, Sequelize);

db.contacts.hasMany(db.proposals, { as: "proposals" });
db.proposals.belongsTo(db.contacts, {
    foreignKey: "contactId",
    as: "contact",
  });

db.contacts.hasMany(db.news, { as: "news" });
db.news.belongsTo(db.contacts, {
    foreignKey: "source",
    as: "contact",
  });

module.exports = db;