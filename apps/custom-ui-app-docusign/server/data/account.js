const path = require("path");
const {
    Sequelize,
    DataTypes
} = require('sequelize');

// Persist in DB SQLite file
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "db.sqlite"),
    logging: false
});

// Account Model
module.exports = sequelize.define('Account', {
    company_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    company_name: DataTypes.STRING,
    access_token: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    settings: DataTypes.STRING
});