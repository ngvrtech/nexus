const express = require('express');
const router = express.Router();

const {
	getAllUsers,
	addUser,
	getUser,
	editUser,
	deleteUser,
} = require('../controllers/users');

router.route('/').get(getAllUsers).post(addUser);
router.route('/:id').get(getUser).patch(editUser).delete(deleteUser);

module.exports = router;
