'use strict';

var express = require('express'),
   controller = require('./info.controller'),
   auth = require('../../auth/auth.service'),
   userEnums = require("../../enum/user.enum"),
   router = express.Router();

router.get("/dashboard", auth.hasRole(userEnums.roles.ADMIN), controller.dashboard);

module.exports = router;