const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Must provide an email address'],
		trim: true,
	},
	password: {
		type: String,
		required: [true, 'Must provide a password'],
	},
	firstName: {
		type: String,
		required: [true, 'Must provide a first name'],
	},
	lastName: {
		type: String,
		required: [true, 'Must provide a last name'],
	},
	avatar: {
		type: String,
		required: [true, 'Must provide an avatar'],
	},
	accountType: {
		type: Number,
		required: [true, 'Must provide an account type'],
		// 1 - Administrator
		// 2 - Housekeeping
		// 3 - Operations
	},
});

module.exports = mongoose.model('User', UserSchema);
