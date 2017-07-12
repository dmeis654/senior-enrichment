'use strict'
const express = require('express');
const app = express();
const api = express.Router();

const db = require('../db')

const studentRouter = require('./routes/student');
const campusRouter = require('./routes/campus');

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'world'}))

api.use('/campus', campusRouter)
api.use('/student', studentRouter)

app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404
	next(err)
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	console.error(err);
	res.send('ERROR');
});

module.exports = api