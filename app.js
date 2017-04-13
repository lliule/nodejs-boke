var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var router = require('./routes/index');
var setting =require('./setting');
var flash = require('connect-flash');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port',process.env.PORT || 3000);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:setting.cookieSecret,
    key:setting.db,
    cookie:{maxAge:1000*60*60*24*30},
    store:new MongoStore({
        db:setting.db,
        host:setting.host,
        port:setting.port
    }),
    resave:true,
    saveUninitialized:true
}));


router(app);
app.listen(app.get('port'),function () {
    console.log('erpress server listening op port '+app.get('port'));
});

module.exports = app;
