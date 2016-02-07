'use strict';

var User = require('./user.model'),
   UserEnum = require("../../enum/user.enum"),
   UserService = require("./user.service");

exports.index = function (req, res) {
	var offset = req.query["offset"] || 0,
		limit = req.query["limit"] || 20;

	User.find({}, UserEnum.projections.defaults).skip(offset).limit(limit).lean().exec(function (err, users) {
		if(err) {
			console.log("Error fetching users", err);
			res.status(404).send(err);
		} else {
			res.status(200).json({users: users});
		}
	});
};


exports.show = function (req, res) {
   var userId = req.params.id;

   User.findOne({_id: userId}).lean().exec(function (err, user) {
      if(err) {
         console.log("Error fetching User", err);
         res.status(404).send(err);
      } else {
         res.status(200).json({user: user});
      }
   })
};

exports.me = function (req, res) {
   var userId = req.user._id;

   User.findOne({_id: userId}, UserEnum.projections.defaults).lean().exec(function (err, user) {
      if(err) {
         return handleError(res, err);
      } else if(user) {
         return res.json(user);
      } else {
         return res.send(401);
      }
   });
};

function handleError(res, err) {
   console.error("user.controller:", err);
   return res.send(500, err);
}