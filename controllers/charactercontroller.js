const router = require('express').Router();
// const { model } = require('../db');
const { CharacterModel } = require('../models/');


router.post('/create', async (req,res) =>{

    CharacterModel.create({
        charName: "Nick",
        charClass: "Bard",
        race: "Human",
        STR: "11",
        DEX: "14",
        CON: "14",
        INT: "16",
        WIS: "15",
        CHA: "10",
        description: "Its just me a dude",
        campaign: "the campaign of life my dude"
})
    })
    // const {charName, charClass, race, STR, DEX, CON, INT, WIS, CHA, description, campaign} =req.body;
    // const charCreate = {
    //     charName,
    //     charClass,
    //     race,
    //     STR,
    //     DEX,
    //     CON,
    //     INT,
    //     WIS,
    //     CHA,
    //     description,
    //     campaign
    // }

    // try{
    //     const Char = await CharacterModel.create(
    //         charCreate,
    //     );
    //     res.status(201).json({
    //         message:`Character successfully created`
    //     })
    // } catch(err){
    //     res.status(500).json({
    //         message:`Failed to create Log: ${err}`
    //     })
    // }
// })
model.exports = router;