const router = require('express').Router();
// const { model } = require('../db');
const {CharacterModel} = require('../models/character')


router.post("/create", async (req,res) =>{
    console.log(req.body);
    const {charName, charClass, race, STR, DEX, CON, INT, WIS, CHA, description,background, campaign} =req.body.character;

    const charCreate = {
        charName,
        charClass,
        race,
        STR,
        DEX,
        CON,
        INT,
        WIS,
        CHA,
        description,
        background,
        campaign,
    }
    console.log(charCreate);

    try{
        const newCharacter = await CharacterModel.create(
            charCreate
            );
            res.status(201).json({
                message:`Character successfully created`,
                newCharacter
            })
            console.log(newCharacter);
        } catch(err){
        res.status(500).json({
            message:`Failed to create Log: ${err}`
        })
    }
})


router.get("/", async (req,res) => {
    try {
        const {charName, charClass, race, STR, DEX, CON, INT, WIS, CHA, description,background, campaign} = await CharacterModel.findAll();
        res.status(500).json({ error: err });
    }
})

router.get("/", async (req,res) => {
    let { id } = req.charName;
    try {
        const {charName, charClass, race, STR, DEX, CON, INT, WIS, CHA, description,background, campaign} = await CharacterModel.findAll(); ({
            where: {
                id: id
            }
        })
        res.status(200).json(charCreate);
    } catch (err) {
        res.status(500).json({ error: err });
    }
})


module.exports = router;