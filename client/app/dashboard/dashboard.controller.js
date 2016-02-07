'use strict';

(function (angular) {

	angular.module("api")
		.controller("DashboardCtrl", ["InfoApi", function (InfoApi) {
         var self = this;

         InfoApi.dashboard({}, function (resp) {
            self.metrics = resp;
         });
		}]);

})(angular);