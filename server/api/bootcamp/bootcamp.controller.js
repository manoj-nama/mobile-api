'use strict';

var Bootcamp = require('./bootcamp.model');

exports.index = function (req, res) {
	var offset = req.query["offset"] || 0,
		limit = req.query["limit"] || 20,
      projection = {sessions: 0};

	Bootcamp.find({}, projection).skip(offset).limit(limit).lean().exec(function (err, camps) {
		if(err) {
			console.log("Error fetching Bootcamp", err);
			res.status(404).send(err);
		} else {
			res.status(200).json({bootcamps: camps});
		}
	});
};

exports.show = function (req, res) {
   var campId = req.params.id;

   Bootcamp.findOne({_id: campId}).lean().exec(function (err, camp) {
      if(err) {
         console.log("Error fetching Session", err);
         res.status(404).send(err);
      } else {
         res.status(200).json({bootcamp: camp});
      }
   })
};