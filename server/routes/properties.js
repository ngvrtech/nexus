const express = require('express');
const router = express.Router();

const {
	getAllProperties,
	addProperty,
	getProperty,
	editProperty,
	deleteProperty,
} = require('../controllers/properties');

router.route('/').get(getAllProperties).post(addProperty);
router
	.route('/:id')
	.get(getProperty)
	.patch(editProperty)
	.delete(deleteProperty);

module.exports = router;
