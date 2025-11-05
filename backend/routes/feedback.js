const express = require('express');
const router = express.Router();
const Feeds = require('../model/Feeds');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

/**
 * @swagger
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       required:
 *         - email
 *         - rating
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         rating:
 *           type: integer
 *           description: Rating value (1-5)
 *           minimum: 1
 *           maximum: 5
 *         comment:
 *           type: string
 *           description: Optional feedback comment
 */  

/**
 * @swagger
 * /api/feed/feedback:
 *   post:
 *     summary: Submit feedback/rating
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Feedback'
 *     responses:
 *       200:
 *         description: Feedback submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 email:
 *                   type: string
 *                 rating:
 *                   type: integer
 *                 comment:
 *                   type: string
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *       409:
 *         description: User has already submitted feedback
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
router.post('/feedback', [

    body("email").isEmail().withMessage('Invalid email format'),
    body("rating").isInt()
], async (req, res) => {
    
    let success = true;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, rating, comment} = req.body;
    try {
        let user = await Feeds.findOne({email});
        if(user) {
            success = false;
            return res.status(409).json({ error: "You have already submitted a rating. Multiple ratings are not allowed." });
        }        

        const newFeedback = new Feeds({
            email: email,
            rating: rating,
            comment: comment
        });
        await newFeedback.save();

        res.json({success, email, rating, comment});
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router