const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
	address: {
		type: String,
		required: [true, 'Must provide an address'],
		trim: true,
	},
	image: {
		type: String,
		default: 'https://placehold.co/600x400?text=Property\nImage',
	},
	cleaningChecklist: {
		type: Array,
	},
	inventoryChecklist: {
		type: Array,
	},
	kitchenInventoryChecklist: {
		type: Array,
	},
	monthlyInspection: {
		type: Array,
	},
	twoMonthInspection: {
		type: Array,
	},
	threeMonthInspection: {
		type: Array,
	},
});

module.exports = mongoose.model('Property', PropertySchema);
