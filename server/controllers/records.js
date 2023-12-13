const Record = require('../models/Record');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllRecords = asyncWrapper(async (req, res) => {
	const records = await Record.find({});
	res.status(200).json({ records });
});

const addRecord = asyncWrapper(async (req, res) => {
	const record = await Record.create(req.body);
	res.status(201).json({ record });
});

const getRecord = asyncWrapper(async (req, res, next) => {
	const { id: recordID } = req.params;
	const record = await Record.findOne({ _id: recordID });
	if (!record) {
		return next(createCustomError(`No record with id : ${recordID}`, 404));
	}
	res.status(200).json({ record });
});

const editRecord = asyncWrapper(async (req, res) => {
	const { id: recordID } = req.params;
	const record = await Record.findOneAndUpdate({ _id: recordID }, req.body, {
		new: true,
		runValidators: true,
	});
	if (!record) {
		return next(createCustomError(`No record with id: ${recordID}`, 404));
	}
	res.status(200).json({ record });
});

const deleteRecord = asyncWrapper(async (req, res) => {
	const { id: recordID } = req.params;
	const record = await Record.findOneAndDelete({ _id: recordID });
	if (!record) {
		return next(createCustomError(`No record with id: ${recordID}`, 404));
	}
	res.status(200).json({ record });
});

module.exports = {
	getAllRecords,
	addRecord,
	getRecord,
	editRecord,
	deleteRecord,
};
