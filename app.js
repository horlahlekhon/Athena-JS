require('events').EventEmitter.prototype._maxListeners = 100;

var request = require("request")
// var categoriesController = require('./controllers').categoriesController
// var typeController = require('./controllers').jobTypesController

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});







//////////////////////////DEFINING JOB TYPES\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const jobType = require('./models').jobtypes

var JType = {
  url: "https://authenticjobs.com/api/?api_key=773918dd6e534968aea99da39185983d&method=aj.types.getList&format=json",
  headers: {
    'Content-type': 'application/json'
  }
}

function job_type(error, response, body) {
  if (!error && response.statusCode == 200) {
    action = JSON.parse(body)

    //    Passing JSON to DB  
    for (var i = 0; i < action.types.type.length; i++) {
      jobType.build({
        typeid: action.types.type[i].id,
        typename: action.types.type[i].name

      }).save()
      app.use(logger("total of " + i + " job types saved"))
    }

  } else {
    console.log("error " + error, response.statusCode)
    app.use(logger("error ->> " + error + "witrh code ->> " + statusCode))
  }
}
//request.get(JCategory, job_category);
request.get(JType, job_type);



/////////////////////////////////////////////DEFINING JOB CATEGORIES\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


var categories = require('./models').categories

var JCategory = {
  url: "https://authenticjobs.com/api/?api_key=773918dd6e534968aea99da39185983d&method=aj.categories.getList&format=json",
  headers: {
    'Content-type': 'application/json'
  }
}

function job_category(error, response, body) {
  if (!error && response.statusCode == 200) {
    action = JSON.parse(body)

    for (var i = 0; i < action.categories.category.length; i++) {
      categories.build({ categoryid: action.categories.category[i].id, categoryname: action.categories.category[i].name }).save()

      app.use(logger("total of " + i + " categories saved"))
    }

  } else {
    console.log("error " + error, response.statusCode)
  }
}
request.get(JCategory, job_category);

module.exports = app;
