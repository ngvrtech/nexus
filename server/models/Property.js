const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
	address: {
		type: String,
		required: [true, 'Must provide an address'],
		trim: true,
		maxLength: [100, 'Name cannot exceed 100 characters'],
	},
	photo: {
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
	oneMonthInspection: {
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
