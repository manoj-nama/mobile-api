'use strict';

var fs = require('fs'),
	request = require('request');

module.exports = function (app) {
	app.use("/v1/api/sessions", require("./api/session"));
	app.use("/v1/api/users", require("./api/user"));
	app.use("/v1/api/bootcamps", require("./api/bootcamp"));
	// app.use('/auth', require('./auth'));
	
	app.route('/*')
		.get(function (req, res, next) {
			res.sendfile(app.get('appPath') + '/home.html');
		});
};