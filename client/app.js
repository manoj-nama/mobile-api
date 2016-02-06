'use strict';

(function (angular) {

   angular.module("api", ["ui.router", "ui.bootstrap", "ngResource", "ngCookies"])
      .config(["$locationProvider", "$urlRouterProvider", function ($locationProvider, $urlRouterProvider) {
         $locationProvider.html5Mode(true);
         $locationProvider.hashPrefix("!");

         $urlRouterProvider.otherwise("/login");
      }])
      .run(["$rootScope", "Auth", "$state", function ($rootScope, Auth, $state) {
         $rootScope.$on('$stateChangeStart', function (event, next, nextParams, from, fromParams) {
            var userPromise = Auth.getCurrentUser().$promise;

            if(from.skipAuthChecks || !next.authenticate) {
               return;
            }

            event.preventDefault();

            from.skipAuthChecks = true;

            if (userPromise) {
               userPromise.then(function () {
                  $state.go(next, nextParams);
               }, function (err) {
                  console.log("Authenticated page, failed to identify user.");
                  $state.go("login");
               })
            } else {
               $state.go("login");
            }
         });
      }]);

})(angular);