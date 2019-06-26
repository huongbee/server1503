const express = require('express')
const app = express();
const parser = require('body-parser');
require('./lib/connectdb')
const cors = require('cors');
app.use(cors());
const { authenticate } = require('./lib/authenticate');

const app = require('./app');

app.listen(3000,()=>console.log('Server start on port 3000!'))