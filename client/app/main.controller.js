'use strict';

(function (angular) {

	angular.module("api")
		.controller("MainCtrl", ["Auth", "$state", function (Auth, $state) {
         var MainCtrl = this;

         MainCtrl.logout = function () {
            Auth.logout(function () {
               $state.go("login");
            });
         };
		}]);

})(angular);