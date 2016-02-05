"use strict";

var _ = require("lodash"),
   url = require("url"),
   environment = process.env.NODE_ENV || "development";

var all = {
   ip: "0.0.0.0",
   port: 9000,
   mongo: {
      options: {
         db: {
            safe: true
         }
      }
   },
   cloudinary: (function () {
      var CLOUDINARY_URL,
         cloudinary,
         cloudinaryAuth;
      var obj = {
         name: "djvymo9lw",
         key: "789611952196239",
         upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || 'ueavkrfy',
         secret: "lwceFvPu4EyrMp2NV-eTcu1YmMs",
         callbackUrl: "/cloudinary_cors.html"
      };
      if (process.env['CLOUDINARY_URL']) {
         CLOUDINARY_URL = process.env['CLOUDINARY_URL'];
         cloudinary = url.parse(CLOUDINARY_URL);
         cloudinaryAuth = cloudinary.auth.split(":");
         obj.name = cloudinary.hostname;
         obj.key = cloudinaryAuth[0];
         obj.secret = cloudinaryAuth[1];
      }
      return obj;
   }())

};

module.exports = _.merge(all, require('./' + environment + '.js') || {});