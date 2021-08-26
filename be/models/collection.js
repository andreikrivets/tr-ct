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

const Collection = sequelize.define('Collection', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  OwnerId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ImageId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addText1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addText2: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addText3: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addBool1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addBool2: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addBool3: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addLine1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addLine2: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addLine3: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addDate1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addDate2: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addDate3: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, { timestamps: false });


module.exports = { Collection }
