const express = require('express')
const router = express.Router();

// create
router.post('/create',(req,res)=>{
    const author = req.userId;
    const content = req.body.content
    
})
// update
// delete
// like
module.exports = router