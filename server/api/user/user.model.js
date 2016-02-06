'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {
		type: String,
		trim: true,
		lowercase: true,
		required: true
	},
   socialId: String,
	name: {
		first: String,
		last: String,
		full: String
	},
	enabled: {type: Boolean, default: true},
	password: String,
	dateCreated: {type: Number, default: Date.now},
	lastUpdated: {type: Number, default: Date.now},
	role: {type: String, enum: ["USER", "ADMIN", "OWNER"], default: "USER"},
	profileImage: String
});

UserSchema.index({email: 1, name: 1});
UserSchema.index({role: 1});
UserSchema.index({socialId: 1});

module.exports = mongoose.model('User', UserSchema);


