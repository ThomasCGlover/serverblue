// require('dotenv').config();

const { Sequelize } = require('sequelize');

const db = new Sequelize('postgres://postgres:58213@localhost:5432/character-creator');

module.exports = db;
