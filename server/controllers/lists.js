const List = require('../models/List');
const asyncWrapper = require('../middleware/async');

const getAllLists = asyncWrapper(async (req, res) => {
	const lists = await List.find({});
	res.status(200).json({ lists });
});

const addList = asyncWrapper(async (req, res) => {
	const list = await List.create(req.body);
	res.status(201).json({ list });
});

const getList = async (req, res, next) => {
	try {
		const { id: listID } = req.params;
		const list = await List.findOne({ _id: listID });
		if (!list) {
			const error = newError('List Not Found');
			error.status = 404;
			return next(error);
		}
		res.status(200).json({ list });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const editList = asyncWrapper(async (req, res) => {
	const { id: listID } = req.params;
	const list = await List.findOneAndUpdate({ _id: listID }, req.body, {
		new: true,
		runValidators: true,
	});
	if (!list) {
		return res.status(404).json({ msg: `No list with id: ${listID}` });
	}
	res.status(200).json({ list });
});

const deleteList = asyncWrapper(async (req, res) => {
	const { id: listID } = req.params;
	const list = await List.findOneAndDelete({ _id: listID });
	if (!list) {
		return res.status(404).json({ msg: `No list with id: ${listID}` });
	}
	res.status(200).json({ list });
});

module.exports = {
	getAllLists,
	addList,
	getList,
	editList,
	deleteList,
};
