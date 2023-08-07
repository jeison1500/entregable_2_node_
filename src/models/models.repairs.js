const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Repair = db.define('repairs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  motorsNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'motors_number',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending',
  },
  usersId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'users_id',
  },
});

module.exports = Repair;
