const { Sequelize, DataTypes } = require('sequelize');
const config = require('config')

const sequelize = new Sequelize(
  config.get("dbName"), 
  config.get("dbUsername"), 
  config.get("dbPassword"), 
  {
    host: config.get("dbServer"),
    dialect: 'mysql'
  });

const Tag = sequelize.define('Tag', {
  TagId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: false });

module.exports = { Tag }
