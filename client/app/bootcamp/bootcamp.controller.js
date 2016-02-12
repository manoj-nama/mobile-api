'use strict';

(function (angular) {

   angular.module("api")
      .controller("BootcampCtrl", ["BootcampApi",
         function (BootcampApi) {
            var self = this;
            self.fetchBootcamps = function () {
               BootcampApi.list({}, function (resp) {
                  self.bootcamps = resp.bootcamps;
               });
            };
            self.fetchBootcamps();
         }])
      .controller("BootcampDetailCtrl", ["$stateParams", "BootcampApi",
         function ($stateParams, BootcampApi) {
            var self = this;

            BootcampApi.get({id: $stateParams.bootcampId}, function (resp) {
               self.bootcamp = resp.bootcamp;
            });
         }])
      .controller("BootcampFormCtrl", ["$stateParams", "BootcampApi", "CloudinaryService",
         function ($stateParams, BootcampApi, CloudinaryService) {
            var self = this;
            self.isNew = true;

            if ($stateParams.bootcampId) {
               self.isNew = false;
               BootcampApi.get({id: $stateParams.bootcampId}, function (resp) {
                  self.bootcamp = resp.bootcamp;
               });
            }

            self.upload = function (files) {
               var file;
               if (!files) return;

               file = files[0];
               CloudinaryService.uploader({
                  file: file
               }).progress(function (e) {
                  file.progress = Math.round((e.loaded * 100.0) / e.total);
                  console.log("UPLOAD:Progress", file.progress + "%");
               }).success(function (data, status, headers, config) {
                  console.log("UPLOAD:Success", data);
                  file.result = data;
               }).error(function (data, status, headers, config) {
                  console.log("UPLOAD:Error", data);
                  file.result = data;
               });
            }
         }]);

})(angular);