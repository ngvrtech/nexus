const Property = require('../models/Property');
const asyncWrapper = require('../middleware/async');

const getAllProperties = asyncWrapper(async (req, res) => {
	const properties = await Property.find({});
	res.status(200).json({ properties });
});

const addProperty = asyncWrapper(async (req, res) => {
	const property = await Property.create(req.body);
	res.status(201).json({ property });
});

const getProperty = async (req, res, next) => {
	try {
		const { id: propertyID } = req.params;
		const property = await Property.findOne({ _id: propertyID });
		if (!property) {
			const error = newError('Property Not Found');
			error.status = 404;
			return next(error);
		}
		res.status(200).json({ property });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const editProperty = asyncWrapper(async (req, res) => {
	const { id: propertyID } = req.params;
	const property = await Property.findOneAndUpdate(
		{ _id: propertyID },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);
	if (!property) {
		return res.status(404).json({ msg: `No property with id: ${propertyID}` });
	}
	res.status(200).json({ property });
});

const deleteProperty = asyncWrapper(async (req, res) => {
	const { id: propertyID } = req.params;
	const property = await Property.findOneAndDelete({ _id: propertyID });
	if (!property) {
		return res.status(404).json({ msg: `No property with id: ${propertyID}` });
	}
	res.status(200).json({ property });
});

module.exports = {
	getAllProperties,
	addProperty,
	getProperty,
	editProperty,
	deleteProperty,
};
