"use strict";

var express		= require("express");
var router		= express.Router();

var Admins = require("../models/Admins");

router.post('/login', function (req, res) {
	//handle login requests
	var email = req.body.email;
	var pass = req.body.pass;
	var error = true;
	var msg = "Email and password not match";
	if(email != '' && pass != ''){
		Admins.findByEmail(email, function(err, admin){
			console.log(admin);
			if(admin){
				res.status(200).send({message: "successful", errors : false});
			}else{
				res.status(500).send({message: msg, errors : true});
			}
		});
	}else{
		res.status(200).send({message: msg, errors : error});
	}
});

router.post('/register', function (req, res) {
	//handle register requests
	var name = req.body.name;
	var email = req.body.email;
	var pass = req.body.pass;
	
	if(name != '' && email != '' && pass != ''){
		var admin = new Admins({
			name: req.body.name,
			email: req.body.email,
			password: req.body.pass
		});
		
		admin.save()
		.then( docs => {
			console.log(docs);
			res.status(201).send({message: "Register Successful", errors : false});
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({message: "Email already exists.", errors : true});
		});
	}else{
		res.status(500).send({message: "Missing required variables.", errors : true});
	}
});

router.post('/update', function (req, res) {
	//handle register requests
});

router.get('/', function (req, res) {
	//check if current user login if yes then returns current user details
	var userInfo = {};
	if(false){
		userInfo = {name : 'jack mechane', email: 'test@gmail.com'};
	}
	res.status(200).send(userInfo);
});

router.get('/all', function (req, res) {
	//get all users
});

router.get('/:userId', function (req, res) {
	//check if current user login if yes then returns current user details
});

module.exports = router;