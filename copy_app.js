var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
//var urlencodedParser = bodyParser.urlencoded({ extended: false });
var indexRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var copy_app = express();

// view engine setup
copy_app.set('views', path.join(__dirname, 'views'));
copy_app.set('view engine', 'pug');

copy_app.use(logger('dev'));
copy_app.use(express.json());
copy_app.use(express.urlencoded({ extended: false }));
copy_app.use(cookieParser());
copy_app.use(express.static(path.join(__dirname, 'public')));

copy_app.use('/', indexRouter);
copy_app.use('/users', usersRouter);


const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password :"",
  database: "RBT"
});


// catch 404 and forward to error handler
copy_app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
copy_app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = copy_app;
