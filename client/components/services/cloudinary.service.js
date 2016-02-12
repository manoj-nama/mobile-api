'use strict';

(function (angular) {
   angular.module("api")
      .factory("CloudinaryService", ["Upload", "cloudinary", function ($upload, cloudinary) {
         return {
            uploader: function (options) {
               var _options = {};
               if (options.tags) {
                  _options.tags = options.tags;
               }
               if (options.context) {
                  _options.context = options.context;
               }
               _options.file = options.file;
               _options.upload_preset = cloudinary.config().upload_preset;
               return $upload.upload({
                  url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                  data: _options
               });
            }
         }
      }]);
})(angular);