const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Formd = require('../model/formd');
const fetchuser = require('../middleware/fetchuser');

Formd.collection.indexExists("email_1", (err, exists) => {
    if (err) {
        console.error("Error checking index existence:", err);
    } else if (exists) {
        Formd.collection.dropIndex("email_1", (dropErr, result) => {
            if (dropErr) {
                console.error("Error dropping index:", dropErr);
            } else {
                console.log("Index dropped successfully:", result);
            }
        });
    } else {
        console.log("The 'email_1' index doesn't exist in the collection.");
    }
});

router.post('/formdata', fetchuser, [

    body('name', "Enter a valid name").isLength({min: 3}),
    body('email', "Enter a valid gmail").optional({ nullable: true }).isEmail(),
    body('age', "Age must be greater than or equal to 18").isInt({min: 18}),
    body('phoneno', "Incorrect phone number").isLength({min: 10, max: 10}),

], async (req, res) => {

    const result = validationResult(req);
    if(!result.isEmpty()) {
        return res.status(400).json({ errors : result.array() });
    } 

    const { name, email, age, phoneno, dep_country, des_country, dep_date, des_date, service_class } = req.body;
    
    try {
        const newData = new Formd({
            user : req.user.id,
            name: name,
            email: email,
            age: age,
            phoneno: phoneno,
            dep_country: dep_country,
            des_country: des_country,
            dep_date: dep_date, 
            des_date: des_date,
            service_class: service_class,
        });
        console.log(req.user.id);
        
        const savedData = await newData.save();
        res.json(savedData);
    } 
    catch (error) {
        console.error(error);
        if (error.code === 11000) {
            res.status(400).json({ error: 'Duplicate key error' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

router.get('/fetchdata', fetchuser, async (req, res) => {
    try {
        const data = await Formd.find({ user : req.user.id })
        res.json(data);
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;