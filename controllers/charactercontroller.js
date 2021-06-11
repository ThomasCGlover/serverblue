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

router.get("/", async (req,res) => {
    try {
        //const {charName, charClass, race, STR, DEX, CON, INT, WIS, CHA, description,background, campaign} = await CharacterModel.findAll();
        const allChar = await CharacterModel.findAll();
        res.status(200).json(allChar);
    }
    catch (err) {
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