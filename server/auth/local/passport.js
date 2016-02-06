'use strict';

var passport = require('passport'),
   Auth = require("../auth.service"),
   LocalStrategy = require('passport-local').Strategy;

exports.setup = function (User, config) {
   passport.use(new LocalStrategy({
         usernameField: 'email',
         passwordField: 'password' // this is the virtual field on the model
      },
      function(email, password, done) {
         User.findOne({
            email: (email || "").toLowerCase()
         }).lean().exec(function(err, user) {
            if (err) return done(err);

            if (!user) {
               return done(null, false, { message: 'This email is not registered.' });
            }

            if (Auth.encryptPassword(password, user._id) !== user.password) {
               return done(null, false, { message: 'This password is not correct.' });
            }
            return done(null, user);
         });
      }
   ));
};