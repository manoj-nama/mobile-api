'use strict';

var CloudinaryService = require("./cloudinary.service");

exports.deleteAllResources = function (req, res) {
   CloudinaryService.deleteAllResources(function () {
      res.status(200).json({message: "Delete request sent!!"});
   });
};