'use strict';

var CloudinaryService = require("./cloudinary.service");

exports.deleteAllResources = function (req, res) {
   var nextCursor = req.query.c || null;
   CloudinaryService.deleteAllResources(nextCursor, function (resp) {
      res.status(200).json({
         next_cursor: resp.next_cursor || "none",
         rate_limit: resp.rate_limit_remaining
      });
   });
};