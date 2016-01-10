'use strict';

var express = require('express'),
mongoose = require('mongoose'),
path = require('path'),
server,
app;


// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Connect to database
mongoose.connect("mongodb://localhost/mobile-api", {});
mongoose.set('debug', true);

// Setup server
app = express();
server = require('http').createServer(app);
require('./server/express')(app);
require('./server/routes')(app);

// Start server
server.listen(9000, "0,0,0,0", function () {
	logger.info('Server listening');
});
