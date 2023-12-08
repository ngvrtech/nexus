const express = require('express');
const router = express.Router();

const {
	getAllRecords,
	addRecord,
	getRecord,
	editRecord,
	deleteRecord,
} = require('../controllers/records');

router.route('/').get(getAllRecords).post(addRecord);
router.route('/:id').get(getRecord).patch(editRecord).delete(deleteRecord);

module.exports = router;
