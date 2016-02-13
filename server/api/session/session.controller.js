'use strict';

var Session = require('./session.model'),
   SessionService = require("./session.api.service"),
   EventType = require("../../enum/event.enum");

exports.index = function (req, res) {
   var options = {
      offset: req.query["offset"] || 0,
      limit: req.query["limit"] || 20,
      projection: {},
      criteria: {}
   };

   SessionService.search(options)
      .once(EventType.ERROR, function (err) {
         return handleError(res, err);
      })
      .once(EventType.SUCCESS, function (sessions) {
         res.status(200).json({sessions: sessions});
      });
};

exports.search = function (req, res) {
   var options = {
      offset: req.body.offset || 0,
      limit: req.body.limit || 20,
      projection: req.body.projection || {},
      criteria: req.body.criteria || {}
   };

   SessionService.search(options)
      .once(EventType.ERROR, function (err) {
         return handleError(res, err);
      })
      .once(EventType.SUCCESS, function (sessions) {
         res.status(200).json({sessions: sessions});
      });
};

exports.show = function (req, res) {
   SessionService.show(req.params.id)
      .once(EventType.ERROR, function (err) {
         return handleError(res, err);
      })
      .once(EventType.SUCCESS, function (session) {
         res.status(200).json({session: session});
      });
};

exports.create = function (req, res) {
   SessionService.create(req.body, req.user)
      .once(EventType.ERROR, function (err) {
         return handleError(res, err);
      })
      .once(EventType.UNAUTHORIZED, function (err) {
         res.status(403).send(err);
      })
      .once(EventType.SUCCESS, function (resp) {
         res.status(200).json(resp);
      })
};


function handleError(res, err) {
   console.error("session.controller:", err);
   return res.status(500).send(err);
}