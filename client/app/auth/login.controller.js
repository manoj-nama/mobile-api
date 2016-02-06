'use strict';

(function (angular) {

   angular.module("api")
      .controller("LoginCtrl", ["Auth", "$state", function (Auth, $state) {
         var LoginCtrl = this;
         LoginCtrl.form = {};

         var userPromise = Auth.getCurrentUser().$promise;

         if(userPromise) {
            userPromise.then(function () {
               $state.go("main.dashboard");
            });
         }

         LoginCtrl.login = function () {
            Auth.login({
               email: LoginCtrl.form.email,
               password: LoginCtrl.form.pass
            }, function (err) {
               if(err) {
                  $state.go("login");
               } else {
                  $state.go("main.dashboard");
               }
            });
         };
      }]);

})(angular);