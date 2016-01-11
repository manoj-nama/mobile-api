'use strict';

var User = require('./user.model');

exports.index = function (req, res) {
	var offset = req.param("offset") || 0,
		limit = req.param("limit") || 20;

	User.find().skip(offset).limit(limit).lean().exec(function (err, users) {
		if(err) {
			console.log("Error fetching users", err);
			res.status(404).send(err);
		} else {
			res.status(200).json({users: users});
		}
	});
};