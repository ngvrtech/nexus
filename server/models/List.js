const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
	list: {
		type: Array,
	},
	listType: {
		type: Number,
	},
	// 1 - Cleaning Checklist
	// 2 - Inventory Checklist
	// 3 - Kitchen Inventory Checklist
	// 4 - Monthly Inspection Checklist
	// 5 - Two-Month Inspection Checklist
	// 6 - Three-Month Inspection Checklist
});

module.exports = mongoose.model('Lists', ListSchema);
