'use strict';

(function (angular) {

	angular.module("api")
		.controller("UserCtrl", ["UserApi", function (UserApi) {
         var self = this;

         self.fetchUsers = function () {
            UserApi.list({}, function(resp) {
               self.users = resp.users;
            });
         };
         self.fetchUsers();
		}])
		.controller("UserDetailCtrl", ["UserApi", "$stateParams", function (UserApi, $stateParams) {
         var self = this;

         UserApi.get({id: $stateParams.userId}, function (resp) {
            self.user = resp.user;
         });
		}]);

})(angular);