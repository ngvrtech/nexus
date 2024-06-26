const express = require('express');
const app = express();
const users = require('./routes/users');
const properties = require('./routes/properties');
const lists = require('./routes/lists');
const records = require('./routes/records');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.json()); // for req.body
app.use(express.static('./public'));
app.use(errorHandlerMiddleware);

// routes
app.use('/api/v1/users', users);
app.use('/api/v1/properties', properties);
app.use('/api/v1/lists', lists);
app.use('/api/v1/records', records);
app.use(notFound);

const port = 3000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`Server is listening on port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};

start();
