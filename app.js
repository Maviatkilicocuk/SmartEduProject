const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoutes');
const courseRoute = require('./routes/courseRoute');


const app = express();

//Connect DB
mongoose.connect('mongodb://127.0.0.1/smartedu-db').then(() =>{
  console.log('DB bağlantısı sağlandı.')
});

// Template Engine
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));
app.use(express.json()); // for parsing/json
app.use(express.urlencoded({extended: true})) //for parsing application

//Routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);


const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
