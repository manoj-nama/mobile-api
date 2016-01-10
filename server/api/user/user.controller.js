'use strict';

var User = require('./user.model');

exports.index = function (req, res) {
	res.status(200).send("list of users ...");
};