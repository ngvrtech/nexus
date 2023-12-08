const errorHandlerMiddleware = (err, req, res, next) => {
	console.log(error);
	return res.status(500).json({ msg: err });
};

module.exports = errorHandlerMiddleware;
