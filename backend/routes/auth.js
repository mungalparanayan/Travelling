const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Nayan@isagood@boy'

router.post('/createuser', [
    body('name', "Enter a valid name").isLength({min: 3}),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be of atleast 5 character").isLength({min: 5})
], async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()) {
        return res.status(400).json({ errors : result.array() });
    } 
    
    try {
        let success = false;
        let user = await User.findOne({ email: req.body.email });
        if(user) {
            return res.status(400).json({ error : "Sorry a user with this email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        const { name, email, password } = req.body;
        const newdata = new User({
            name: name,
            email: email,
            password: secPass
        })
        const Data = await newdata.save();

        const data = {
            newdata : { // write a name of created model
                id : newdata.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        if(authtoken) {
            success = true;
        }
        res.json({authtoken, success});
    }
    catch(error) {
        res.status(500).send("Internal server error");
    }
});

router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password can not be blank").exists()
], async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()) {
        return res.status(400).json({ errors : errors.array() });
    } 

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ error : "Please try to login with correct credentials" });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword) {
            return res.status(400).json({ error : "Please try to login with correct credentials" });
        }

        const data = {
            user : {
                id : user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({email, authtoken});
    }
    catch(error) {
        res.status(500).send("Internal server error");
    }
});

router.get('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const guser = await User.findById(userId).select("-password");
        res.send(guser);
    }   
    catch(error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;