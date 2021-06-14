const router = require('express').Router();
const {UniqueConstraintError} = require("sequelize/lib/errors");
const {UserModel} = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const middleware = require('../middleware');

router.post("/register", async (req, res) => {
    let {email, password} = req.body.user;
    try{
        const User = await UserModel.create({
            email,
            password: bcrypt.hashSync(password, 15)
        });

        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 168}) //change 168 back to 24 
        

        res.status(201).json({
            message: "Successfully registered user",
            user: User,
            sessionToken: token
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
            let comparePasswords = await bcrypt.compare(password, loginUser.password);

            if(comparePasswords){

                let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 168}); //change 168 back to 24

            res.status(200).json({
                user: loginUser,
                message: "Successfully logged in!",
                sessionToken: token
            })

        } else{
            res.status(401).json({
                message: "Incorrect email or password"
            })
        }} else{
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

router.put('/update/:id', middleware.validateSession, async (req, res) => {
    const {email, password} = req.body.user
    try {
        const update = await UserModel.update({email}, {where: {id: req.params.id}})
        res.status(200).json(update)
    } catch (error) {
        res.status(500).json({
            message: 'Error updating user!'
        })
    }
})

module.exports = router;