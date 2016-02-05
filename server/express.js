'use strict';

var express = require('express'),
	compression = require('compression'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
   config = require("./config"),
	path = require('path');

module.exports = function (app) {
	app.use(compression());
	app.use(bodyParser());	
	app.use(cookieParser());

	app.use(express.static(path.join(process.cwd(), 'client')));
	app.set('appPath', 'client');
	app.locals.appPath = 'client';
};