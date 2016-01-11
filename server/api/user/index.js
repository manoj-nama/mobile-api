'use strict';

var express = require('express'),
	controller = require('./user.controller'),
	router = express.Router();

router.get("/", controller.index);

module.exports = router;