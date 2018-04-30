const mongoose = require('mongoose');

var productSchema = mongoose.Schema({
	title: 'String',
	details: 'String',
	photo: 'String',
	quantity: 'Number',
	date_added: 'Timestamp'
});


var Product = mongoose.model('Product', productSchema);

module.exports = Product;