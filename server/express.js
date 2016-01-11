'use strict';

var express = require('express'),
	compression = require('compression'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	path = require('path'),
	root = path.normalize(__dirname + "../");

module.exports = function (app) {
	app.use(compression());
	app.use(bodyParser());	
	app.use(cookieParser());

	app.use(express.static(path.join(root, 'client')));
	app.set('appPath', 'client');
	app.locals.appPath = 'client';
};