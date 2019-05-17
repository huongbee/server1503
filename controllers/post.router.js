const express = require('express')
const router = express.Router();
const { Post } = require('../models/Post');

// create
router.post('/create',(req,res)=>{
    const author = req.userId;
    const content = req.body.content
    Post.createPost(author,content)
    .then(post=>res.send({
        success: true,
        data: post,
        message: ''
    }))
    .catch(err=>res.send({
        success: false,
        data: null,
        message: err.message
    }))
})
// update
// delete
// like
module.exports = router