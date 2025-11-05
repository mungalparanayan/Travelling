const express = require('express');
const router = express.Router();
const Note = require('../model/Note');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: Note title
 *           minLength: 3
 *         description:
 *           type: string
 *           description: Note description
 *           minLength: 5
 *         tag:
 *           type: string
 *           description: Note tag/category
 *         user:
 *           type: string
 *           description: User ID (auto-assigned)
 *         date:
 *           type: string
 *           format: date-time
 *           description: Creation date (auto-assigned)
 */  

/**
 * @swagger
 * /api/notes/fetchallnotes:
 *   get:
 *     summary: Get all notes for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
// ROUTE 1 :- Get All the Notes using : GET "api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({user : req.user.id})
        res.json(notes);
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

/**
 * @swagger
 * /api/notes/addnote:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *               description:
 *                 type: string
 *                 minLength: 5
 *               tag:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 savedNote:
 *                   $ref: '#/components/schemas/Note'
 *                 success:
 *                   type: boolean
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
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
// ROUTE 2 :- add a new Note using : POST "api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid title").isLength({min: 3}),
    body('description', "Description must be atleast 5 characters").isLength({min: 5}),
], async (req, res) => {
    try {
        const {title, description, tag} = req.body;
        const success = true;

        // If there are errors, return bad request and the errors 
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user : req.user.id
        })
        const savedNote = await note.save()

        res.json({savedNote, success})
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

/**
 * @swagger
 * /api/notes/updatenote/{id}:
 *   put:
 *     summary: Update an existing note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *               description:
 *                 type: string
 *                 minLength: 5
 *               tag:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */
// ROUTE 3 :- Update an existing Note using : PUT "api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;

    try {
        // Create a newNote object
        const newNode = {}
        if(title) {newNode.title = title};
        if(description) {newNode.description = description};
        if(tag) {newNode.tag = tag};

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(404).send("Not found")
        }

        // Allow updation only if user owns this Note
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNode}, {new: true})
        res.json(note);
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

/**
 * @swagger
 * /api/notes/deletenote/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Sucess:
 *                   type: string
 *                 note:
 *                   $ref: '#/components/schemas/Note'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */
// ROUTE 4 :- Delete an existing Note using : DELETE "api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(404).send("Not found")
        }

        // Allow deletion only if user owns this Note
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Sucess" : "Note has been deleted", note : note});
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router