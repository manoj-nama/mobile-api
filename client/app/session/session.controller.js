'use strict';

(function (angular) {

	angular.module("api")
		.controller("SessionCtrl", ["SessionApi", function (SessionApi) {
         var self = this;
			//console.log("SessionCtrl");

         self.fetchSessions = function () {
            SessionApi.list({}, function(resp) {
               self.sessions = resp.sessions;
            });
         };
         self.fetchSessions();
		}])
      .controller("SessionDetailCtrl", ["$stateParams", "SessionApi", function ($stateParams, SessionApi) {
         var self = this;

         SessionApi.get({id: $stateParams.sessionId}, function (resp) {
            console.log(resp.session);
            self.session = resp.session;
         });
      }])
      .controller("SessionEditCtrl", ["$stateParams", "SessionApi", function ($stateParams, SessionApi) {
         var self = this;

         SessionApi.get({id: $stateParams.sessionId}, function (resp) {
            self.session = resp.session;
         });
      }]);

})(angular);