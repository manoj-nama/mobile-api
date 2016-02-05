'use strict';

var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var SessionSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   description: String,
   enabled: {type: Boolean, default: true},
   sessionLogo: String,
   dateCreated: {type: Number, default: Date.now},
   lastUpdated: {type: Number, default: Date.now},
   scheduleTime: {type: Number, default: Date.now},
   assets: [
      {
         "id": {type: Schema.Types.ObjectId, ref: 'Asset'},
         "publicId": String,
         "title": String
      }
   ],
   createdBy: {
      id: {type: Schema.Types.ObjectId, ref: 'User'},
      name: String,
      email: String,
      profileImageId: String
   }
});

module.exports = mongoose.model('Session', SessionSchema);


