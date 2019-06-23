const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/relation1503?replicaSet=rs',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify: false
}).then(()=>console.log('DB connected!'))
.catch(err=>console.log(err.message))

