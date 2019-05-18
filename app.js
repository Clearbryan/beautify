const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const config = require('./config/config');
const checkDbConnection = require('./database/db');
const passport = require('passport');
const session = require('express-session');

// passport
require('./config/passport-auth')(passport);

const app = express();

// cors middleware
app.use(cors());

// connect to database 
checkDbConnection.then( c => console.log('Connected to Database')).catch((err) => {throw err});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/stylist', require('./routes/stylist'));

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// start server
app.listen(config.PORT, console.log(`API runing in ${config.environment} mode on port: ${config.PORT}`));

module.exports = app;
