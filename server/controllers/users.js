const User = require('../models/User');
const asyncWrapper = require('../middleware/async');

const getAllUsers = asyncWrapper(async (req, res) => {
	const users = await User.find({});
	res.status(200).json({ users });
});

const addUser = asyncWrapper(async (req, res) => {
	const user = await User.create(req.body);
	res.status(201).json({ user });
});

const getUser = async (req, res, next) => {
	try {
		const { id: userID } = req.params;
		const user = await User.findOne({ _id: userID });
		if (!user) {
			const error = newError('User Not Found');
			error.status = 404;
			return next(error);
		}
		res.status(200).json({ user });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const editUser = asyncWrapper(async (req, res) => {
	const { id: userID } = req.params;
	const user = await User.findOneAndUpdate({ _id: userID }, req.body, {
		new: true,
		runValidators: true,
	});
	if (!user) {
		return res.status(404).json({ msg: `No user with id: ${userID}` });
	}
	res.status(200).json({ user });
});

const deleteUser = asyncWrapper(async (req, res) => {
	const { id: userID } = req.params;
	const user = await User.findOneAndDelete({ _id: userID });
	if (!user) {
		return res.status(404).json({ msg: `No user with id: ${userID}` });
	}
	res.status(200).json({ user });
});

module.exports = {
	getAllUsers,
	addUser,
	getUser,
	editUser,
	deleteUser,
};
