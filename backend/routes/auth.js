const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Nayan@isagood@boy'

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: User's full name
 *           minLength: 3
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password
 *           minLength: 5
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *     AuthResponse:
 *       type: object
 *       properties:
 *         authtoken:
 *           type: string
 *           description: JWT token for authentication
 *         success:
 *           type: boolean
 *         email:
 *           type: string
 *     UserResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/auth/createuser:
 *   post:
 *     summary: Create a new user account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Validation error or user already exists
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
 *       500:
 *         description: Internal server error
 */
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
        console.log("salt is : ", salt);
        const secPass = await bcrypt.hash(req.body.password, salt);
        console.log("secpass is : ", secPass);

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
        console.log(data);
        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log("token ", authtoken);

        if(authtoken) {
            success = true;
        }
        res.json({authtoken, success});
    }
    catch(error) {
        res.status(500).send("Internal server error");
    }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 authtoken:
 *                   type: string
 *       400:
 *         description: Invalid credentials or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/auth/getuser:
 *   get:
 *     summary: Get current user information
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
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