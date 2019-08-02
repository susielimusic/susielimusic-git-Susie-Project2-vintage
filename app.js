var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var session = require('express-session')
require('dotenv').config();
//var server = require('http').createServer(app)


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var signupRouter = require('./routes/signup');
var signupOwnerRouter = require('./routes/owners/signup');
var loginRouter = require('./routes/login');
var loginOwnerRouter = require('./routes/owners/login');
var logoutRouter = require('./routes/logout')
var profileRouter = require('./routes/profileLover')
var productRouter = require('./routes/products/product')
var profileOwner = require('./routes/owners/profileOwner')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
  secret: 'very safe indeed',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//var server = require('http').createServer(app)

app.use('/', indexRouter);
app.use('/about', aboutRouter)
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/owners/signup', signupOwnerRouter);
app.use('/owners/profile', profileOwner)
app.use('/', loginRouter);
app.use('/owners', loginOwnerRouter);
app.use('/profile', profileRouter);
app.use('/logout', logoutRouter);
app.use('/products', productRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 3000);
  res.render('error');
});
mongoose.connect(process.env.MONGODB_URI);
app.listen(process.env.PORT, function(){console.log('App is running on port 3000')})
module.exports = app;