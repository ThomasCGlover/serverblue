const router = require('express').Router();
// const { model } = require('../db');
const CharacterModel = require('../models/character')


router.post("/create", async (req,res) =>{
    console.log(req.body);
    const {charName, charClass, race, STR, DEX, CON, INT, WIS, CHA, description,background, campaign} =req.body.character;
    // const { id } = req.user;

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
        } catch(err){
        res.status(500).json({
            message:`Failed to create Character: ${err}`
        })
    }
})

router.put('/:id', async (req, res) =>{
    const {charName, charClass, race, STR, DEX, CON, INT, WIS, CHA, description,background, campaign} =req.body.character;
    try{
        const charUpdate = await CharacterModel.update({
            charName, charClass, race, STR, DEX, CON, INT, WIS, CHA, description,background, campaign},
            {where: {id: req.params.id}}
            )
            res.status(200).json({
                message: `Character successfully updated`,
                charUpdate
            })
    }catch(err) {
        resizeBy.status(500).json({
            message: `Failed to update Character: ${err}`
        })
    }
})
module.exports = router;