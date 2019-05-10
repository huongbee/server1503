const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/relation1503',{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>console.log('DB connected!'));


