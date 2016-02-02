'use strict';

var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var BootcampSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   description: String,
   running: {type: Boolean, default: true},
   dateCreated: {type: Number, default: Date.now},
   lastUpdated: {type: Number, default: Date.now},
   dateStarted: {type: Number, default: Date.now},
   sessions: [
      {
         "id": {type: Schema.Types.ObjectId, ref: 'Session'},
         "title": String,
         "description": String,
         "owner": {
            "id": {type: Schema.Types.ObjectId, ref: "User"},
            "name": String,
            "profileImageId": String
         }
      }
   ],
   duration: Number
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);


