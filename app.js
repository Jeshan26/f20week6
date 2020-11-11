var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksrouter= require('./routes/tasks');

var app = express();
// database connection with connection string
const mongoose = require('mongoose');
// gettig the connection string from the config file
const globals= require('./config/globals');
//console.log(globals.db);
mongoose.connect(globals.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((res)=> { // use arroy function in project i just used so that i kniw this too
    console.log("Connection success to MongoDb")
}).catch(() => {
    console.log("Connection Failed to MongoDb");
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Headers")
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksrouter);

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

// app.listen(3000,'127.0.0.1',function(){
//   console.log('server listening on 3000');
// })

module.exports = app;
