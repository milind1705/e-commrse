const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
require('dotenv').config({
    path:'../index.env'
})
const User = require('../models/user')
router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', [
    check('name', "Name is required").not().isEmpty(),
    check('email', "enter the valid Email").isEmail(),
    check('password', "Enter the password with minimum length of 6 charachter").isLength({
        min:6
    })
], async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
//get name, email, passsword from request
    const { name, email, password} = req.body;
    try{
        // check user already exist
        let user = await User.findOne({email});
        // if user exist
        if (user){
            return res.status(400).json({
                errors: [
                    {msg:"Users already exist"}
                ],
            })
        }

        //if not exist 
        //create new user
        user = new User({
            name, email, password
        })
        // encrypt password
        const salt = await bcrypt.genSalt(10); 
        //save password
        user.password = await bcrypt.hash(password, salt)
        //save user in database
        await user.save();
        //payload to generate token
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, //for jwt token we need the private key as a random string
            "asdfghjk", { 
                expiresIn:36000
            }, (err, token) => {
                if(err) throw err
                res.json({token})
            }
        )

    } catch (error){
        //console.log(err.message)
        res.status('500').send('server error')
    }
})


module.exports= router