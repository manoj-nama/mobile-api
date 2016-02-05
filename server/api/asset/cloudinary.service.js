'use strict';
var _ = require('lodash'),
   async = require("async"),
   cloudinary = require("cloudinary"),
   config = require('../../config/index'),
   crypto = require("crypto");

function ConfigManager() {
   var cloud_name = config.cloudinary.name,
      api_key = config.cloudinary.key,
      api_secret = config.cloudinary.secret;
   this.getDefaultConfig = function (public_id, type) {
      var options = {
         cloud_name: cloud_name,
         api_key: api_key,
         overwrite: true,
         api_secret: api_secret
      };
      if (type) {
         options.resource_type = type;
      }
      if (public_id) {
         options.public_id = public_id;
      }
      return options;
   }
}
var cloudManager = new ConfigManager();

exports.cloudManager = cloudManager;

exports.uploadImage = function (srcUrl, publicId, callback) {
   process.nextTick(function () {
      cloudinary.uploader.upload(
         srcUrl,
         function (result) {
            if (callback && (typeof callback === "function")) callback(result);
         },
         cloudManager.getDefaultConfig(publicId)
      );
   });
};

exports.renameImage = function (publicId, newPublicId, callback) {
   if (!callback || (typeof callback !== "function")) {
      callback = publicId;
      publicId = null;
   }
   process.nextTick(function () {
      cloudinary.uploader.rename(
         publicId,
         newPublicId,
         function (result) {
            if (callback && (typeof callback === "function")) callback(result);
         },
         cloudManager.getDefaultConfig()
      );
   });
};

exports.uploadRawFile = function (srcUrl, publicId, callback) {
   if (!callback || (typeof callback !== "function")) {
      callback = publicId;
      publicId = null;
   }
   process.nextTick(function () {
      cloudinary.uploader.upload(
         srcUrl,
         function (result) {
            if (callback && (typeof callback === "function")) callback(result);
         },
         cloudManager.getDefaultConfig(publicId, 'raw')
      );
   });
};

exports.uploadFromStream = function (inputStream, callback, publicId) {
   if(inputStream) {
      var stream = cloudinary.uploader.upload_stream(function (result) {
            if (callback && (typeof callback === "function")) callback(result);
         },
         cloudManager.getDefaultConfig(publicId)
      );
      if(stream) {
         inputStream.on('data', stream.write);
         inputStream.on('end', stream.end);
      } else {
         callback({});
      }
   } else {
      callback({});
   }
};

exports.destroyImage = function (publicId, callback) {
   cloudinary.uploader.destroy(publicId, callback, cloudManager.getDefaultConfig());
};

exports.deleteAllResources = function (callback) {
   var cloudConfig = cloudManager.getDefaultConfig();
   cloudinary.api.delete_all_resources(callback, cloudConfig);
};

exports.destroyAllTransformationImage = function (publicId, callback, keepOriginal) {
   var cloudConfig = cloudManager.getDefaultConfig();
   cloudConfig.keep_original = keepOriginal || false;
   cloudinary.api.delete_resources([publicId], callback, cloudConfig);
};

exports.getEncryptedCloudinaryDetails = function (publicId, callcack) {
   var data = {};
   var cloudinaryConfigData;
   var signature = [];
   var cloudinaryConfig = config.cloudinary;
   data.callback = cloudinaryConfig.callbackUrl;
   if (publicId) {
      data.invalidate = true;
      data.public_id = publicId;
      signature.push("public_id=" + publicId);
      signature.push("invalidate=true");
   }
   data.timestamp = (new Date().getTime() / 1000) + "";
   signature.push("callback=" + cloudinaryConfig.callbackUrl);
   signature.push("timestamp=" + data.timestamp);

   data.signature = crypto.createHash("sha1").update(signature.join("&") + cloudinaryConfig.secret).digest("hex");
   data.api_key = cloudinaryConfig.key;
   cloudinaryConfigData = data;
   callcack(null, cloudinaryConfigData);
};
