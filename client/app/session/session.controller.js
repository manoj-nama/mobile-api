'use strict';

(function (angular) {

	angular.module("api")
		.controller("SessionCtrl", ["SessionApi", function (SessionApi) {
         var self = this;
			//console.log("SessionCtrl");

         self.fetchSessions = function () {
            SessionApi.list({}, function(resp) {
               //console.log(resp.sessions[0]);
               self.sessions = resp.sessions;
            });
         };
         self.fetchSessions();
		}])
      .controller("SessionDetailCtrl", ["$stateParams", "SessionApi", function ($stateParams, SessionApi) {
         var self = this;
         //console.log("SessionDetailCtrl", $stateParams);

         SessionApi.get({id: $stateParams.sessionId}, function (resp) {
            //console.log(resp.session);
            self.session = resp.session;
         });
      }]);

})(angular);