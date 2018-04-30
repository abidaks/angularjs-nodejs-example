const mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
	user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	quatity: 'String',
	delivery_address: 'String',
	date_added: 'Timestamp'
});


var Order = mongoose.model('Order', orderSchema);

module.exports = Order;