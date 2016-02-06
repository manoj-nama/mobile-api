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
         "primaryOwner": {
            "id": {type: Schema.Types.ObjectId, ref: "User"},
            "name": String,
            "profileImageId": String
         },
         "owners": [
            {
               "id": {type: Schema.Types.ObjectId, ref: "User"},
               "name": String,
               "profileImageId": String,
               "primary": Boolean
            }
         ]
      }
   ],
   duration: Number
});

BootcampSchema.index({title: 1});
BootcampSchema.index({running: 1});

module.exports = mongoose.model('Bootcamp', BootcampSchema);


