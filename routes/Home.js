var express = require("express");
var router	= express.Router();

router.get('/', function (req, res) {
	var homePage = "This is the default home page";
	res.status(200).send(homePage);
});

module.exports = router;