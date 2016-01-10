'use strict';

var Session = require('./session.model');

exports.index = function (req, res) {
	res.status(200).send("list of sessions ...");
};