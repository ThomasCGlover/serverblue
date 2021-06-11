const router = require('express').Router();
const {UniqueConstraintError} = require("sequelize/lib/errors");
const {UserModel} = require('../models');

router.post("/register", async (req, res) => {
    let {email, password} = req.body.user;
    try{
        const User = await UserModel.create({
            email,
            password,
        });

        res.status(201).json({
            message: "Successfully registered user",
            user: User,
        });
    } catch (err){
        if(err instanceof UniqueConstraintError){
            res.status(409).json({
                message: "This email is already in use!"
            });
        } else{
            res.status(500).json({
                message: "Failed to register the user"
            });
        }
    }
});

router.post("/login", async (req, res) => {
    let {email, password} = req.body.user;

    try{
        let loginUser = await UserModel.findOne({
            where: {
                email: email,
            },
        })
        if(loginUser){
            res.status(200).json({
                user: loginUser,
                message: "Successfully logged in!"
            })

        } else{
            res.status(401).json({
                message: "Incorrect email or password"
            })
        }
    } catch(err){
        res.status(500).json({
            message: "Failed to log in"
        })
    }
});





module.exports = router;