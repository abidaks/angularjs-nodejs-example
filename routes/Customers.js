var express = require("express");
var router	= express.Router();

router.post('/add', function (req, res) {
	//handle register requests
	var name = req.body.name;
	var email = req.body.email;
	var pass = req.body.pass;
	var error = true;
	var msg = "Missing required variables.";
	if(name != '' && email != '' && pass != ''){
		error = false;
		msg = "";
	}
	res.status(200).send({message: msg, errors : error});
});

router.post('/update', function (req, res) {
	//handle register requests
});

router.get('/', function (req, res) {
	//get all users
	var Users = {};
	res.status(200).send(Users);
});

router.get('/:userId', function (req, res) {
	//check if current user login if yes then returns current user details
});

module.exports = router;