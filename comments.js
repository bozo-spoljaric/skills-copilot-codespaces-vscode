//create web server
const express = require('express');
const router = express.Router();
const comments = require('../controllers/comments');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateComment, isCommentAuthor } = require('../middleware');

//create a comment
router.post('/', isLoggedIn, validateComment, catchAsync(comments.createComment));

//delete a comment
router.delete('/:commentId', isLoggedIn, isCommentAuthor, catchAsync(comments.deleteComment));

module.exports = router;