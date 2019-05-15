const express = require('express')
const router = express.Router();
const { User } = require('../models/User')
const { authenticate } = require('../lib/authenticate');

// signup
router.post('/signup',(req,res)=>{
    const { email, name, password } = req.body
    User.signUp(email, name, password)
    .then(user=>res.send({
        success: true,
        data: user,
        message: ''
    }))
    .catch(err=>res.send({
        success: false,
        data: null,
        message: err.message
    }))
})
// signin
router.post('/signin',(req,res)=>{
    const { email, password } = req.body;
    User.signIn(email, password)
    .then(user=>{
        return res.send({
            success: true,
            data: user,
            message: ''
        })
    })
    .catch(err=>res.send({
        success: false,
        data: null,
        message: err.message
    }))
})

// send friend request
router.post('/add-friend',authenticate,(req,res)=>{
    const { idReceiver } = req.body;
    const idSender = req.userId
    User.addFriend(idSender, idReceiver)
    .then(result => res.send({
        success: true,
        data: result,
        message: ''
    }))
    .catch(err=>res.send({
        success: false,
        data: null,
        message: err.message
    }))
})

// accept friend
router.post('/accept-friend',authenticate,(req,res)=>{
    const { idReceiver } = req.body;
    const idSender = req.userId
    User.acceptFriend(idSender, idReceiver)
    .then(result => res.send({
        success: true,
        data: result,
        message: ''
    }))
    .catch(err=>res.send({
        success: false,
        data: null,
        message: err.message
    }))
})
// remove friend

module.exports = router