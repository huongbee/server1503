const express = require('express')
const router = express.Router();
const { User } = require('../models/User')

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
        // create token

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

// signout
// add friend
// accept friend
// remove friend

module.exports = router