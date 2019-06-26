const express = require('express')
const app = express();
const parser = require('body-parser');
require('./lib/connectdb')
const cors = require('cors');
app.use(cors());
const { authenticate } = require('./lib/authenticate');

const userRouter = require('./controllers/user.router')
const postRouter = require('./controllers/post.router')

app.use(parser.json({type: 'application/json'}))
app.use('/user',userRouter);
app.use('/post',authenticate, postRouter);
module.exports = app