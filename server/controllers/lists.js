const List = require('../models/List');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllLists = asyncWrapper(async (req, res) => {
	const lists = await List.find({});
	res.status(200).json({ lists });
});

const addList = asyncWrapper(async (req, res) => {
	const list = await List.create(req.body);
	res.status(201).json({ list });
});

const getList = asyncWrapper(async (req, res, next) => {
	const { id: listID } = req.params;
	const list = await List.findOne({ _id: listID });
	if (!list) {
		return next(createCustomError(`No list with id: ${listID}`, 404));
	}
	res.status(200).json({ list });
});

const editList = asyncWrapper(async (req, res) => {
	const { id: listID } = req.params;
	const list = await List.findOneAndUpdate({ _id: listID }, req.body, {
		new: true,
		runValidators: true,
	});
	if (!list) {
		return next(createCustomError(`No list with id: ${listID}`, 404));
	}
	res.status(200).json({ list });
});

const deleteList = asyncWrapper(async (req, res) => {
	const { id: listID } = req.params;
	const list = await List.findOneAndDelete({ _id: listID });
	if (!list) {
		return next(createCustomError(`No list with id: ${listID}`, 404));
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
