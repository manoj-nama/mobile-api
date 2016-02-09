'use strict';

var express = require('express'),
	mongoose = require('mongoose'),
   config = require("./server/config"),
   fs = require("fs"),
	path = require('path'),
   options = {
      key: fs.readFileSync(process.env.SSL_KEY),
      cert: fs.readFileSync(process.env.SSL_CERT)
   },
	server,
   sslServer,
	app;

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Connect to database
mongoose.connect(config.mongo.uri);
mongoose.set('debug', config.mongo.debug);

// Setup server
app = express();
server = require('http').createServer(app);
sslServer = require('https').createServer(options, app);
require('./server/express')(app);
require('./server/routes')(app);
require('./server/seed')();

// Start server
server.listen(config.port, config.ip, function () {
	console.log('Server listening on port', config.port);
});
sslServer.listen(config.sslPort, config.ip, function () {
	console.log('Server listening on port', config.port);
});