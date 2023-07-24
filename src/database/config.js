const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'postgres',
  database: 'motos3',
  username: 'postgres',
  password: '1232',
  host: 'localhost',
  port: 5432,
  logging: false,
});

module.exports = { db };
