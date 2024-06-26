const express = require('express');
const router = express.Router();

const {
	getAllLists,
	addList,
	getList,
	editList,
	deleteList,
} = require('../controllers/lists');

router.route('/').get(getAllLists).post(addList);
router.route('/:id').get(getList).patch(editList).delete(deleteList);

module.exports = router;
