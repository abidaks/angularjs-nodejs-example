const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	full_name: 'String',
	email: 'String',
	password: 'String',
	full_address: 'String',
	user_photo: 'String',
	date_added: 'Timestamp'
});


var User = mongoose.model('User', userSchema);

module.exports = User;