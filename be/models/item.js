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

const Item = sequelize.define('Item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CollectionId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addBool1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  addBool2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  addBool3: {
    type: DataTypes.STRING,
    allowNull: true
  },
  addLine1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  addLine2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  addLine3: {
    type: DataTypes.STRING,
    allowNull: true
  },
  addText1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  addText2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  addText3: {
    type: DataTypes.STRING,
    allowNull: true
  },
  addDate1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  addDate2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  addDate3: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, { timestamps: false },   
{ indexes: [
  { type: 'FULLTEXT', name: 'itemsFT', fields: ['Name', 'addLine1', 'addLine2', 'addLine3', 'addText1', 'addText2', 'addText3'] }
]}
);


module.exports = { Item }
