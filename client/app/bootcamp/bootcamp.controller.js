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
            console.log(resp.bootcamp);
            self.bootcamp = resp.bootcamp;
         });
		}]);

})(angular);