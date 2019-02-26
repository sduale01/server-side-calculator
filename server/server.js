const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const calculationRouter = require('./router/calculation.router')

// finds data and makes it easy to access in POST
app.use(bodyParser.urlencoded({extended: true}));

app.use('/calculation', calculationRouter);

app.use(express.static('server/public'));



app.listen(PORT, ()=> {
    console.log('listening on port: ', PORT);
    
});