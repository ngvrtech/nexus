const Record = require('../models/Record');
const asyncWrapper = require('../middleware/async');

const getAllRecords = asyncWrapper(async (req, res) => {
	const records = await Record.find({});
	res.status(200).json({ records });
});

const addRecord = asyncWrapper(async (req, res) => {
	const record = await Record.create(req.body);
	res.status(201).json({ record });
});

const getRecord = async (req, res, next) => {
	try {
		const { id: recordID } = req.params;
		const record = await Record.findOne({ _id: recordID });
		if (!record) {
			const error = newError('Record Not Found');
			error.status = 404;
			return next(error);
		}
		res.status(200).json({ record });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const editRecord = asyncWrapper(async (req, res) => {
	const { id: recordID } = req.params;
	const record = await Record.findOneAndUpdate({ _id: recordID }, req.body, {
		new: true,
		runValidators: true,
	});
	if (!record) {
		return res.status(404).json({ msg: `No record with id: ${recordID}` });
	}
	res.status(200).json({ record });
});

const deleteRecord = asyncWrapper(async (req, res) => {
	const { id: recordID } = req.params;
	const record = await Record.findOneAndDelete({ _id: recordID });
	if (!record) {
		return res.status(404).json({ msg: `No record with id: ${recordID}` });
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
