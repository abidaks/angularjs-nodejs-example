var express = require("express");
var app		= express();
var path    = require("path");
var open = require('open');

//for all html files
app.use('/html', express.static(__dirname + '/html'));


app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/html/index.html'));
});

app.get('/home', function (req, res) {
	var ret = 'This is a test home page';
	var query = req.query;
	Object.keys(query).forEach(function(key) {
		ret += '<br>'+key+' : '+query[key];
	});
	
	res.status(200).send({message: ret});
});

app.get('/products', function (req, res) {
	var ret = 'This is a test products page';
	res.status(200).send({message: ret});
});

app.get('/orders', function (req, res) {
	var ret = 'This is a test orders page';
	res.status(200).send({message: ret});
});

app.get('/customers', function (req, res) {
	var ret = 'This is a test Customers page';
	res.status(200).send({message: ret});
});

app.get('/reports', function (req, res) {
	var ret = 'This is a test reports page';
	res.status(200).send({message: ret});
});

app.get('/settings', function (req, res) {
	var ret = 'This is a test settings page';
	res.status(200).send({message: ret});
});

app.listen(3000, function() {
	open('http://localhost:3000/');
});

console.log("App running on port 3000.");