'use strict';

var User = require("../user/user.model"),
   Bootcamp = require("../bootcamp/bootcamp.model"),
   Session = require("../session/session.model"),
   async = require("async");

exports.dashboard = function (req, res) {
   var tasks = [];

   tasks.push(function (cb) {
      User.count({enabled: true}, cb);
   });
   tasks.push(function (cb) {
      Bootcamp.count({}, cb);
   });
   tasks.push(function (cb) {
      Session.count({enabled: true}, cb);
   });

   async.parallel(tasks, function (err, resp) {
      if(err) {
         handleError(res, err);
      } else {
         res.json({
            users: resp[0],
            bootcamps: resp[1],
            sessions: resp[2]
         });
      }
   });
};

function handleError(res, err) {
   console.error("info.controller:", err);
   return res.send(500, err);
}