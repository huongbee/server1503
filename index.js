const express = require('express')
const app = express();
const parser = require('body-parser');
const userRouter = require('./controllers/user.router')
require('./lib/connectdb')

app.use(parser.json({type: 'application/json'}))
app.use('/user',userRouter);

app.listen(3000,()=>console.log('Server start on port 3000!'))