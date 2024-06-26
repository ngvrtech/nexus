require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const users = require('./routes/users');
const properties = require('./routes/properties');
const lists = require('./routes/lists');
const records = require('./routes/records');

const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json()); // for req.body

// routes
app.use('/api/v1/users', users);
app.use('/api/v1/properties', properties);
app.use('/api/v1/lists', lists);
app.use('/api/v1/records', records);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`Server is listening on port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};

start();
