const express = require('express')
const app = express();
const parser = require('body-parser');
app.use(parser.json({type: 'application/json'}))

app.listen(3000,()=>console.log('Server start on port 3000!'))