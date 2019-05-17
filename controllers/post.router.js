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
router.post('/update',(req,res)=>{
    const { content, _id } = req.body
    // call to model
})
// delete
router.post('/delete',(req,res)=>{
    const { _id } = req.body
    // call to model
})

router.post('/like',(req,res)=>{
    const userId = req.userId;
    const { postId } = req.body
    Post.likePost(userId, postId)
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
router.post('/dislike',(req,res)=>{
    const userId = req.userId;
    const { postId } = req.body
    Post.dislikePost(userId, postId)
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
module.exports = router