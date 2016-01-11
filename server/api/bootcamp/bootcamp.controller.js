'use strict';

var Bootcamp = require('./bootcamp.model');

exports.index = function (req, res) {
	var offset = req.param("offset") || 0,
		limit = req.param("limit") || 20;

	Bootcamp.find().skip(offset).limit(limit).lean().exec(function (err, camps) {
		if(err) {
			console.log("Error fetching Bootcamp", err);
			res.status(404).send(err);
		} else {
			res.status(200).json({bootcamp: camps});
		}
	});
};