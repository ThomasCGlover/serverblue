const router = require('express').Router();
// const { model } = require('../db');
const CharacterModel = require('../models/character')
const validateSession = require('../middleware')
const middleware = require('../middleware')


router.post("/create", middleware.validateSession, async (req, res) => {
    console.log(req.body);

    const {charName, charClass, race, STR, DEX, CON, INT, WIS, CHA, description, background, campaign } = req.body.character;
    const {id} = req.user;
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
        owner_id: id
    }
    console.log(charCreate);

    try {
        const newCharacter = await CharacterModel.create(
            charCreate
        );
        res.status(201).json({
            message: `Character successfully created`,
            newCharacter
        })
        console.log(newCharacter);
    } catch (err) {
        res.status(500).json({
            message: `Failed to create Log: ${err}`
        })
    }
})

router.put('/:id', middleware.validateSession, async (req, res) =>{
    const {charName, charClass, race, STR, DEX, CON, INT, WIS, CHA, description,background, campaign, owner_id} =req.body.character;
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
        const allChar = await CharacterModel.findAll();
        res.status(200).json(allChar);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
})

router.get("/me", middleware.validateSession, async (req,res) => {
    try {
        const {id} = req.user;
        const userChar = await CharacterModel.findAll({
            where: {owner_id:id}
        })
        res.status(200).json(userChar);
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

// router.get("/:id", async (req, res) => {
//     const {id} = req.params;
//     try{
//         const results = await LogModel.findAll({
//             where: {
//                 id: id
//             }
//         });
//         res.status(200).json(results);
//     } catch(err){
//         res.status(500).json({error: err});
//     }
// });



router.delete('/delete/:id', middleware.validateSession, async (req, res) => {
    try {
        const deleteChar = await CharacterModel.destroy({
            where: { id: req.params.id }
        })
        res.status(200).json({
            message: "Character successfully deleted",
            deletedChar: deleteChar
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to delete character: ${err}`
        })
    }
})



module.exports = router;