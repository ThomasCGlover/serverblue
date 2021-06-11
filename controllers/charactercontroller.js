const router = require("express").Router;
const {CharacterModel} = require('../models');


router.delete('/character/delete', async (req, res) => {

    try {
        const byeChar = await CharacterModel.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json({
            message: `${byeChar} deleted.`
        })
     } catch (error) {
        res.status(500).json({
            message: `Failed to delete character ${err}`
        })
    }
})

module.exports = router;