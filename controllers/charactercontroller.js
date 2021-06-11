const router = require('express').Router();
// const { model } = require('../db');
const CharacterModel = require('../models/character')


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


router.delete('/delete/:id', async (req, res) => {
    try{
        const deleteChar = await CharacterModel.destroy({
          where: {id: req.params.id}
        })
          res.status(200).json({
            message: "Character successfully deleted",
            deletedChar: deleteChar
          })
      } catch(err){
        res.status(500).json({
          message: `Failed to delete character: ${err}`
        })
      }
    })


module.exports = router;