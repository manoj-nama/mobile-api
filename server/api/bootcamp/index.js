'use strict';

var express = require('express'),
	controller = require('./bootcamp.controller'),
	router = express.Router();

router.get("/", controller.index);

module.exports = router;