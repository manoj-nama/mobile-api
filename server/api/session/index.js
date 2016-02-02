'use strict';

var express = require('express'),
	controller = require('./session.controller'),
	router = express.Router();

router.get("/", controller.index);
router.get("/:id", controller.show);

module.exports = router;