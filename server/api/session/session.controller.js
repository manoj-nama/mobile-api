'use strict';

var Session = require('./session.model');

exports.index = function (req, res) {
	var offset = req.query["offset"] || 0,
		limit = req.query["limit"] || 20;

	Session.find().skip(offset).limit(limit).lean().exec(function (err, sessions) {
		if(err) {
			console.log("Error fetching Sessions", err);
			res.status(404).send(err);
		} else {
			res.status(200).json({sessions: sessions});
		}
	});
};

exports.show = function (req, res) {
   var sessId = req.params.id;

   Session.findOne({_id: sessId}).lean().exec(function (err, session) {
      if(err) {
         console.log("Error fetching Session", err);
         res.status(404).send(err);
      } else {
         res.status(200).json({session: session});
      }
   })
};