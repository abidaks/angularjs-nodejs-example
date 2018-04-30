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
	//get all products
	var userInfo = {};
	if(false){
		userInfo = {name : 'jack mechane', email: 'test@gmail.com'};
	}
	res.status(200).send(userInfo);
});

router.get('/:productId', function (req, res) {
	//get product details based on productId
});

module.exports = router;