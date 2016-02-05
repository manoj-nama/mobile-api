'use strict';

var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var AssetSchema = new Schema({
   title: String,
   type: String,
   description: String,
   publicId: String,
   resourceUrl: String,
   enabled: {type: Boolean, default: true},
   dateCreated: {type: Number, default: Date.now},
   lastUpdated: {type: Number, default: Date.now},
   uploader: {
      id: {type: Schema.Types.ObjectId, ref: 'User'},
      name: String,
      email: String,
      profileImageId: String
   }
});

module.exports = mongoose.model('Asset', AssetSchema);


