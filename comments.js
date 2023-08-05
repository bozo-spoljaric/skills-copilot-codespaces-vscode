//create web server
const express = require('express');
const router = express.Router();
//import the model
const Comment = require('../models/Comment');

//create route for comments
//get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.json({ message: err });
    }
});

//submit a comment
router.post('/', async (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    try {
        const savedComment = await comment.save();
        res.json(savedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

//get specific comment
router.get('/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        res.json(comment);
    } catch (err) {
        res.json({ message: err });
    }
});

//delete specific comment
router.delete('/:commentId', async (req, res) => {
    try {
        const removedComment = await Comment.remove({ _id: req.params.commentId });
        res.json(removedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

//update a comment
router.patch('/:commentId', async (req, res) => {
    try {
        const updatedComment = await Comment.updateOne({ _id: req.params.commentId }, { $set: { comment: req.body.comment } });
        res.json(updatedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;