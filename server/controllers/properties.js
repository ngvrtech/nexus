const Property = require('../models/Property');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllProperties = asyncWrapper(async (req, res) => {
	const properties = await Property.find({});
	res.status(200).json({ properties });
});

const addProperty = asyncWrapper(async (req, res) => {
	const property = await Property.create(req.body);
	res.status(201).json({ property });
});

const getProperty = asyncWrapper(async (req, res, next) => {
	const { id: propertyID } = req.params;
	const property = await Property.findOne({ _id: propertyID });
	if (!property) {
		return next(createCustomError(`No property with id: ${propertyID}`, 404));
	}
	res.status(200).json({ property });
});

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
		return next(createCustomError(`No property with id: ${propertyID}`, 404));
	}
	res.status(200).json({ property });
});

const deleteProperty = asyncWrapper(async (req, res) => {
	const { id: propertyID } = req.params;
	const property = await Property.findOneAndDelete({ _id: propertyID });
	if (!property) {
		return next(createCustomError(`No property with id: ${propertyID}`, 404));
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
