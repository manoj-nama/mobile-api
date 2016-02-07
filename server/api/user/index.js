'use strict';

var express = require('express'),
	controller = require('./user.controller'),
   auth = require('../../auth/auth.service'),
   userEnums = require("../../enum/user.enum"),
	router = express.Router();

router.get("/", auth.hasRole(userEnums.roles.ADMIN), controller.index);
router.get("/me", auth.isAuthenticated(), controller.me);
router.get("/:id", auth.isAuthenticated(), controller.show);

module.exports = router;