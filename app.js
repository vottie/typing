var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// added
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// added mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/user_test", {useNewUrlParser: true});
app.use(session({
//  secret: this.defaultConfiguration.secret.session,
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
// added
//app.use(connect.cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var User = require("./models/user");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals = {
      user: req.user
  };
  next();
});

var index = require('./routes/index');
//var user = require('./routes/users');

app.use('/index',index);
//app.use('/users',user);

//passport.use(new LocalStrategy({
//  usernameField: 'username',
//  passwordField: 'password',
//  passReqToCallback: true,
//  session: false,
//}, function (req, username, password, done) {
//  process.nextTick(function () {
//    if (username === "test" && password === "test") {
//    return done(null, username)
//    } else {
//      console.log("login error")
//      return done(null, false, {message : 'パスワードが正しくありません'})
//    }
//  })
//}));

app.use('/', indexRouter);
//app.use('/users', usersRouter);

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
