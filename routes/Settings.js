var express = require("express");
var router	= express.Router();

router.get('/', function (req, res) {
	var ret = 'This is a test settings page';
	res.status(200).send({message: ret});
});

module.exports = router;