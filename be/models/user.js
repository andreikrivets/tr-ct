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

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
      type: DataTypes.STRING,
      allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, { timestamps: false });


module.exports = { User }
