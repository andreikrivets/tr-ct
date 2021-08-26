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

const ItemTag = sequelize.define('ItemTag', {
  ItemId: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  TagTagId: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { timestamps: false });

module.exports = { ItemTag }
