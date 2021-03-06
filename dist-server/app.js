"use strict";

var createError = require('http-errors');

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var cors = require('cors');

var mongoose = require('mongoose');

var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');

var pollRouter = require('./routes/poll');

require('dotenv').config(); // connect to the mongod database


require('./config/database.js');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/polls', pollRouter); // Set this app if you are adding a react frontend.
// Just add the build folder to the root directory

app.use(express["static"](path.join(__dirname, '../build'))); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;