const {DataTypes} = require('sequelize');
const db = require('../db');

const CharacterModel = db.define('Char',{
    charName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    charClass:{
        type: DataTypes.STRING,
        allowNull: false
    },
    race:{
        type: DataTypes.STRING,
        allowNull: false
    },
    STR:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    DEX:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    CON:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    INT:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    WIS:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    CHA:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type: DataTypes.STRING,
    },
    background:{
        type: DataTypes.STRING,
    },
    campaign:{
        type: DataTypes.STRING,
    }
})

module.exports = CharacterModel;