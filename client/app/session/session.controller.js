'use strict';

(function (angular) {

	angular.module("api")
		.controller("SessionCtrl", ["SessionApi", function (SessionApi) {
         var self = this;
			console.log("SessionCtrl");

         self.fetchSessions = function () {
            SessionApi.list({}, function(resp) {
               console.log(resp.sessions[0]);
               self.sessions = resp.sessions;
            });
         };
         self.fetchSessions();
		}]);

})(angular);