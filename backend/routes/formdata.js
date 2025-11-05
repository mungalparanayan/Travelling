const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Formd = require('../model/formd');
const fetchuser = require('../middleware/fetchuser');

/**
 * @swagger
 * components:
 *   schemas:
 *     TravelForm:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - phoneno
 *       properties:
 *         name:
 *           type: string
 *           description: Traveler's full name
 *           minLength: 3
 *         email:
 *           type: string
 *           format: email
 *           description: Traveler's email address (optional)
 *         age:
 *           type: integer
 *           description: Traveler's age
 *           minimum: 18
 *         phoneno:
 *           type: string
 *           description: Phone number (10 digits)
 *           minLength: 10
 *           maxLength: 10
 *         dep_country:
 *           type: string
 *           description: Departure country
 *         des_country:
 *           type: string
 *           description: Destination country
 *         dep_date:
 *           type: string
 *           format: date
 *           description: Departure date
 *         des_date:
 *           type: string
 *           format: date
 *           description: Destination date
 *         service_class:
 *           type: string
 *           description: Service class (Economy, Business, First)
 */

// Formd.collection.indexExists("email_1", (err, exists) => {
//     if (err) {
//         console.error("Error checking index existence:", err);
//     } else if (exists) {
//         Formd.collection.dropIndex("email_1", (dropErr, result) => {
//             if (dropErr) {
//                 console.error("Error dropping index:", dropErr);
//             } else {
//                 console.log("Index dropped successfully:", result);
//             }
//         });
//     } else {
//         console.log("The 'email_1' index doesn't exist in the collection.");
//     }
// });

/**
 * @swagger
 * /api/form/formdata:
 *   post:
 *     summary: Submit travel form data
 *     tags: [Travel Forms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TravelForm'
 *     responses:
 *       200:
 *         description: Travel form submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TravelForm'
 *       400:
 *         description: Validation error or duplicate entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/form/fetchdata:
 *   get:
 *     summary: Get all travel forms for the authenticated user
 *     tags: [Travel Forms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Travel forms retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TravelForm'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
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