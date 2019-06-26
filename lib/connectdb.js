const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/relation1503',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify: false,
})
// .then(()=>console.log('DB connected!'))
// .catch(err=>console.log(err.message))

// npm install run-rs -g
// run-rs -v 4.0.0 --shell
// ?replicaSet=rs