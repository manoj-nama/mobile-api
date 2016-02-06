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

AssetSchema.index({publicId: 1});
AssetSchema.index({type: 1});
AssetSchema.index({"uploader.id": 1});
AssetSchema.index({resourceUrl: 1}, {sparse: true});

module.exports = mongoose.model('Asset', AssetSchema);


