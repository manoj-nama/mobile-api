'use strict';

(function (angular) {

	angular.module("api")
		.controller("BootcampCtrl", ["BootcampApi", function (BootcampApi) {
         var self = this;
         self.fetchBootcamps = function () {
            BootcampApi.list({}, function(resp) {
               self.bootcamps = resp.bootcamps;
            });
         };
         self.fetchBootcamps();
		}])
		.controller("BootcampDetailCtrl", ["$stateParams", "BootcampApi", function ($stateParams, BootcampApi) {
         var self = this;

         BootcampApi.get({id: $stateParams.bootcampId}, function (resp) {
            self.bootcamp = resp.bootcamp;
         });
		}])
		.controller("BootcampFormCtrl", ["$stateParams", "BootcampApi", function ($stateParams, BootcampApi) {
         var self = this;
         self.isNew = true;

         if($stateParams.bootcampId) {
            self.isNew = false;
            BootcampApi.get({id: $stateParams.bootcampId}, function (resp) {
               self.bootcamp = resp.bootcamp;
            });
         }
		}]);

})(angular);