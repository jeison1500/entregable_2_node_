const { dataTypes } = require('sequelize');
const { db } = require('../database/config');

const Error = db.define('Error', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  status: {
    type: dataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: dataTypes.STRING,
    allowNull: false,
  },
  stack: {
    type: dataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Error;
