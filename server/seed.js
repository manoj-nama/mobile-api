'use strict';

var async = require("async"),
	User = require("./api/user/user.model"),
	Session = require("./api/session/session.model"),
	Bootcamp = require("./api/bootcamp/bootcamp.model");

function bootstrapUsers(callback) {
	var tasks = [];

	User.count({role: "ADMIN"}, function (err, count) {
		if(err) {
			console.log("Error bootstrapping Users", err);
			callback(err);
		} else if(count) {
			console.log("Users already bootstrapped");
			callback(null);
		} else {
			tasks.push(function (cb) {
				new User({
					email: "manoj.nama@tothenew.com",
					name: {
						first: "manoj",
						last: "nama",
						full: "manoj nama"
					},
					roles: "ADMIN"
				}).save(cb);
			});
			tasks.push(function (cb) {
				new User({
					email: "sakshi.tyagi@tothenew.com",
					name: {
						first: "kaku",
						last: "tyagi",
						full: "kaku tyagi"
					},
					roles: "ADMIN"
				}).save(cb);
			});
			async.parallel(tasks, callback);
		}
	});
} 

function bootstrapSessions (callback) {
	var tasks = [];
	Session.count(function (err, count) {
		if(err) {
			console.log("Error bootstrapping Sessions", err);
			callback(err);
		} else if(count) {
			console.log("Sessions already bootstrapped");
			callback(null);
		} else {
			tasks.push(function (cb) {
				new Session({
					title: "Intro to JavaScript",
					description: "Getting to know the basics of JavaScript"
				}).save(cb);
			});
			tasks.push(function (cb) {
				new Session({
					title: "Object Oriented JavaScript",
					description: "The first pillar of JavaScript and deep OOP concepts"
				}).save(cb);
			});
			tasks.push(function (cb) {
				new Session({
					title: "Intro to AngularJS",
					description: "Most popular Front-end MVC framework"
				}).save(cb);
			});
			tasks.push(function (cb) {
				new Session({
					title: "Getting to know NodeJS",
					description: "JavaScript on the server side"
				}).save(cb);
			});
			async.parallel(tasks, callback);
		}
	});
}

function bootstrapBootcamps (callback) {
	var tasks = [];

	Bootcamp.count(function (err, count) {
		if(err) {
			console.log("Error bootstrapping Bootcamps", err);
			callback(err);
		} else if(count) {
			console.log("Bootcamps already bootstrapped");
			callback(null);
		} else {
			tasks.push(function (cb) {
				new Bootcamp({
					title: "Freshers camp",
					description: "Bootcamp for freshers for January",
					duration: 30
				}).save(cb);
			});
			tasks.push(function (cb) {
				new Bootcamp({
					title: "Experienced camp",
					description: "Bootcamp for Experienced joinees",
					duration: 6
				}).save(cb);
			});
			async.parallel(tasks, callback);
		}
	});
}

module.exports = function () {
	var tasks = [];

	tasks.push(bootstrapUsers);
	tasks.push(bootstrapSessions);
	tasks.push(bootstrapBootcamps);

	async.parallel(tasks, function (err, resp) {
		if(err) {
			console.log("Error bootstrapping seed data", err);	
		} else {
			console.log("Successfully bootstrapped data");
		}
	});
};