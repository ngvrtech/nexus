const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
	date: {
		type: Date,
	},
	propertyAddress: {
		type: String,
	},
	serviceType: {
		type: Number,
	},
	service: {
		type: Number,
	},
	employee: {
		type: String,
	},
	startTime: {
		type: Date,
	},
	completionTime: {
		type: Date,
	},
	billableHours: {
		type: Number,
	},
	status: {
		type: Number,
	},
	// 1 - In-Progress
	// 2 - Completed
	// 3 - Cancelled
	// 4 - Needs Attention
	damageNotes: {
		type: String,
	},
	missingNotes: {
		type: String,
	},
	employeeNotes: {
		type: String,
	},
	adminNotes: {
		type: String,
	},
});

module.exports = mongoose.model('Record', RecordSchema);
