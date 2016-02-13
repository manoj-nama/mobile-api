'use strict';

var config = require("../config");

exports.getConfig = function (req, res) {

   var clientConfig = {
      cloudinary: {
         cloud_name: config.cloudinary.name,
         upload_preset: config.cloudinary.upload_preset
      }
   };

   var scriptData = "'use strict'; angular.module('api')" +
      ".constant('AppConfig'," +
      JSON.stringify(clientConfig) +
      ")";
   res.header("Content-Type", "text/javascript");
   res.status(200).send(scriptData);
};