'use-strict';

var express			= require("express");
var bodyParser		= require("body-parser");
var app				= express();
var path			= require("path");
var mongose			= require("mongoose");
var cookieParser	= require('cookie-parser');
var session			= require('express-session');

var homeRoutes		= require("./routes/home");
var userRoutes		= require("./routes/users");
var orderRoutes		= require("./routes/Orders");
var productRoutes	= require("./routes/Products");
var settingRoutes	= require("./routes/Settings");
var customerRoutes	= require("./routes/Customers");

mongose.connect('mongodb://localhost:27017/testdb');

app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    key: 'user_sid',
    secret: 'thisisatestapplication',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    if (!req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

app.all('*',function(req,res,next){
    if((req.session.user && req.cookies.user_sid) || req.url == '/users/login' || req.url == '/users/register' || req.url == '/' || req.url.indexOf('/html') == 0){
		if(req.session.user && req.cookies.user_sid && (req.url == '/users/login' || req.url == '/users/register')){
			next(new Error(401));
		}else{
			next();
		}
    }else{
        next(new Error(401));
    }
});

app.use(function(err,req,res,next){
    if(err instanceof Error){
        if(err.message === '401'){
            res.status(401).send("Not Authorized");
        }
    }
});

app.use('/users', userRoutes);
app.use('/home', homeRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/customers', customerRoutes);
app.use('/settings', settingRoutes);


app.use('/html', express.static(__dirname + '/html'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/html/index.html'));
});

module.exports = app;