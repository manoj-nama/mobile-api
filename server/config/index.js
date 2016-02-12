"use strict";

var _ = require("lodash"),
   url = require("url"),
   environment = process.env.NODE_ENV || "development";

var all = {
   ip: "0.0.0.0",
   port: 3000,
   mongo: {
      options: {
         db: {
            safe: true
         }
      }
   },
   secrets: {
      session: 'yomama',
      sessionTimeMillis: process.env.SESSION_TIMEOUT || 2592000000 //DEFAULT: 30 days
   },
   cloudinary: (function () {
      var CLOUDINARY_URL,
         cloudinary,
         cloudinaryAuth;
      var obj = {
         name: "<somename>",
         key: "<somekey>",
         upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || '<somepreset>',
         secret: "<somesecret>",
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