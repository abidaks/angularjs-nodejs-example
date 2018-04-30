var express = require("express");
var router	= express.Router();

router.post('/update', function (req, res) {
	//handle update order requests
});

router.get('/', function (req, res) {
	//get all orders
	var orders = {};
	res.status(200).send(orders);
});

router.get('/:orderId', function (req, res) {
	//get order by orderId
});

module.exports = router;