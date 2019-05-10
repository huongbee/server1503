const express = require('express')
const router = express.Router();
const { User } = require('../models/User')

// signup
router.post('/signup',(req,res)=>{
    const { email, name, password } = req.body
    User.signUp(email, name, password)
    .then(user=>res.send(user))
    .catch(err=>res.send(err))
})
// signin

// signout
// add friend
// accept friend
// remove friend

module.exports = router