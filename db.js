const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:cletus123@localhost:5432/dnd-users")

module.exports = sequelize;