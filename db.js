// require('dotenv').config();

const { Sequelize } = require('sequelize');

const db = new Sequelize('postgres://postgres:password@localhost:5432/character-creator');

module.exports = db;