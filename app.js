const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodoverride = require('method-override');
const pageRoute = require('./routes/pageRoutes');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

//Connect DB
mongoose.connect('mongodb+srv://enverbilalbirinci:Enver.5334.@smartedu.etv8yib.mongodb.net/smartedu?retryWrites=true&w=majority&appName=SmartEdu').then(() => {
  console.log('DB bağlantısı sağlandı.');
});

// Template Engine
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));
app.use(express.json()); // for parsing/json
app.use(express.urlencoded({ extended: true })); //for parsing application
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://enverbilalbirinci:Enver.5334.@smartedu.etv8yib.mongodb.net/smartedu?retryWrites=true&w=majority&appName=SmartEdu' }),
  }) );
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(
  methodoverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//Routes
app.use((req, res, next) => {
  res.locals.userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
