const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:58213@localhost:5432/dnd-users")

module.exports = sequelize;