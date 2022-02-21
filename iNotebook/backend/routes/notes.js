const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');


//Route 1---------------------------------------------------------------------------------->

//get all the notes using get "/api/notes/fetchallnotes" . login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})



//Route 2---------------------------------------------------------------------------------->

//add notes using post "/api/notes/addnote" . login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })



//PUT method is called when you have to modify a single resource while POST method is called when you have to add a child resource
//PUT requests are idempotent while POST is not. That is, calling the same PUT request multiple times will always produce the same result


//Route 3---------------------------------------------------------------------------------->
//update an existing notes using put "/api/notes/updatenote" . login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated 
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }//if note which user want to update not found

        //if user is someone else and try to update some other user's note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        //update note successfully
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 4---------------------------------------------------------------------------------->
//delete exsiting note using delete "/api/notes/deletenote" . login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        // Find the note to be deleted 
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }//if note which user want to update not found

        //Allows deletion only if user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        //delete note successfully
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;
