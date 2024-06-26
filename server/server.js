const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Middleware and route handlers
app.use(express.json());

require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;

// get driver connection
const dbo = require('./db/conn');
app.listen(port, () => {
	// perform a database connection when server starts
	dbo.connectToServer(function (err) {
		if (err) console.error(err);
	});
	console.log(`Server is running on port: ${port}`);
});

