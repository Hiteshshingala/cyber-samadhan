var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var companyRouter = require('./routes/company');
// var addressRouter = require('./routes/address');

var app = express();
require('dotenv').config()
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/.well-known/pki-validation/', express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
// app.use('/api/v1/company', companyRouter);
// app.use('/api/v1/address', addressRouter);

// for cors enable
app.use(cors({
  origin: '*'
}));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
