'use strict';

var express = require("express"),
	async = require("async"),
	Mongo = require("mongodb");


app.get("/sessions", function(req, res) {
	Mongo.collection("sessions").find(function (err, sessions) {
		res.json({sessions: sessions});
	});
});	