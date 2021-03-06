'use strict';

var express = require('express'),
	controller = require('./session.controller'),
   auth = require('../../auth/auth.service'),
   userEnums = require("../../enum/user.enum"),
	router = express.Router();

router.get("/", auth.isAuthenticated(), controller.index);
router.post("/", auth.isAuthenticated(), controller.create);
router.post("/search", auth.isAuthenticated(), controller.search);
router.get("/:id", auth.isAuthenticated(), controller.show);

module.exports = router;