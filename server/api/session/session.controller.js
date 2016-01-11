'use strict';

var Session = require('./session.model');

exports.index = function (req, res) {
	var offset = req.param("offset") || 0,
		limit = req.param("limit") || 20;

	Session.find().skip(offset).limit(limit).lean().exec(function (err, sessions) {
		if(err) {
			console.log("Error fetching Sessions", err);
			res.status(404).send(err);
		} else {
			res.status(200).json({sessions: sessions});
		}
	});
};