const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//init app
const app = express();

//config
const db = require('./config/mongodb').mongoURI;

//router
const posts = require('./route/posts');

mongoose 
    .connect(db,{useNewUrlParser: true})
    .then(() => console.log('mongodb connected....'))
    .catch(err => console.log('mongodb connect error'));


//body parser Middelware
app.use(bodyParser.json({limit: '3mb'}));
app.use(bodyParser.urlencoded({
    parameterLimit:100000,
    limit:'3mb',
    extended: true
}))

//router use 
app.use('/api/post',posts);

//through client
app.use(express.static('build'))
app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'build','index.html'));
})

//server 
const port = process.env.PORT | 5000;

app.listen(port ,() => console.log(`Server is running port ${port}`))


