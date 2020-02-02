var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var dotenv = require('dotenv')
var cors = require('cors')
var PORT = 4500

dotenv.config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apisRouter = require('./routes/apis')


var app = express();


mongoose.connect(process.env.DB_URL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) { throw err.stack }
    console.log("connected to db!");

  })


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Request-Headers","refreshtoken")
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,refreshtoken,authorization,id");
  res.header("Access-Control-Expose-Headers","newaccesstoken")

  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/users/', usersRouter);
app.use('/api/', apisRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log("error is triggered..", err);

  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if (res.status == 401) {
    res.json({ message: 'Not Authorised' })
  }
  else if (res.status == 500) {
    res.json({ message: "some error occured.." })
  }

  // res.render('error');
});

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);

})

module.exports = app;
