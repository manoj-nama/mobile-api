'use strict';

var Session = require("./session.model"),
   EventType = require("../../enum/event.enum"),
   EventEmitter = require("events").EventEmitter;

exports.create = function (data, user) {
   var emitter = new EventEmitter();

   if (!user) {
      return emitter.emit(EventType.UNAUTHORIZED, "The user is not authorized");
   }

   data.createdBy = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      profileImageId: user.profileImage
   };

   new Session(data).save(function (err, resp) {
      if (err) {
         return emitter.emit(EventType.ERROR, err);
      } else {
         return emitter.emit(EventType.SUCCESS, resp);
      }
   });

   return emitter;
};

exports.show = function (sessionId) {
   var emitter = new EventEmitter();
   Session.findOne({_id: sessionId}).lean().exec(function (err, session) {
      if (err) {
         console.log("Error fetching Session", err);
         return emitter.emit(EventType.ERROR, err);
      } else {
         return emitter.emit(EventType.SUCCESS, session);
      }
   });
   return emitter;
};

exports.search = function (options) {
   var emitter = new EventEmitter();

   Session.find().skip(options.offset).limit(options.limit).lean().exec(function (err, sessions) {
      if (err) {
         console.log("Error fetching Sessions", err);
         return emitter.emit(EventType.ERROR, err);
      } else {
         return emitter.emit(EventType.SUCCESS, sessions);
      }
   });

   return emitter;
};