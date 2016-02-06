'use strict';

var mongoose = require('mongoose'),
   config = require('../config'),
   crypto = require('crypto'),
   jwt = require('jsonwebtoken'),
   expressJwt = require('express-jwt'),
   compose = require('composable-middleware'),
   User = require('../api/user/user.model'),
   validateJwt = expressJwt({ secret: config.secrets.session }),
   userEnums = require("./../enum/user.enum");

function hasUserRole(roleToCheck) {
   var r = userEnums.roles;
   return (r.hasOwnProperty(roleToCheck) && roleToCheck === this.role);
}

/**
 * allow access_token to be passed through query parameter as well
 */
function normalizeToken(req, res, next) {
   var accessToken = null;
   if (req.query && req.query.hasOwnProperty('access_token')) {
      accessToken = req.query.access_token;
   } else if (req.cookies.token) {
      accessToken = req.cookies.token.replace(new RegExp('"', 'g'), '');
   }
   req.headers.authorization = 'Bearer ' + accessToken;
   next();
}

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated(projection) {
   projection = projection || userEnums.projections.defaults;
   return compose()
      .use(normalizeToken)
      // Validate jwt
      .use(function (req, res, next) {
         validateJwt(req, res, next);
      })
      // Attach user to request
      .use(function (req, res, next) {
         User.findOne({_id: req.user._id}, projection, {lean: true}, function (err, user) {
            if (err) return next(err);
            if (!user) return res.send(401);
            user.hasRole = hasUserRole;
            req.user = user;
            next();
         });
      });
}

/**
 * Attaches the user object to the request if header contains valid authorization token
 */
function addUserIfAuthenticated(projection) {
   projection = projection || userEnums.projections.defaults;
   return compose()
      .use(normalizeToken)
      // Validate jwt if available
      .use(function (req, res, next) {
         validateJwt(req, res, function () {
            next();
         });
      })
      // Attach user to request if logged in
      .use(function (req, res, next) {
         if (req.user && req.user._id) {
            User.findOne({_id: req.user._id}, projection, {lean: true}, function (err, user) {
               if (user) {
                  user.hasRole = hasUserRole;
                  req.user = user;
               }
               next();
            });
         } else {
            next()
         }
      })
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
   if (!roleRequired) throw new Error('Required role needs to be set');

   return compose()
      .use(isAuthenticated())
      .use(function meetsRequirements(req, res, next) {
         if (req.user.role === roleRequired) {
            next();
         }
         else {
            res.send(403);
         }
      });
}

/**
 * Checks if the user role has default password
 */
function hasPassword(req, res, next) {
   if (req.query.password === 'igdefault') {
      next();
   } else {
      res.send(401, "Wrong password!");
   }
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
   return jwt.sign({ _id: id }, config.secrets.session, { expiresInMinutes: config.secrets.sessionTimeMillis / (1000 * 60) });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
   if (!req.user) return res.json(404, { message: 'Something went wrong, please try again.'});
   var token = signToken(req.user._id);
   res.cookie('token', JSON.stringify(token), {maxAge: config.secrets.sessionTimeMillis});
   res.redirect('/');
}

function getSalt(id) {
   return ("{" + (id || '') + "}");
}

function encryptPassword(plainText, id) {
   return crypto.createHash('md5').update((plainText + getSalt(id))).digest('hex').toString();
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.hasPassword = hasPassword;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
exports.addUserIfAuthenticated = addUserIfAuthenticated;
exports.encryptPassword = encryptPassword;