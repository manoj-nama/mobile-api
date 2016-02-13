'use strict';

(function (angular) {

   angular.module("api", [
      "ui.router",
      "ui.bootstrap",
      "ngResource",
      "cloudinary",
      "ngTagsInput",
      "ngFileUpload",
      "ngCookies"
   ])
      .config(["$locationProvider", "$urlRouterProvider", "cloudinaryProvider", "AppConfig",
         function ($locationProvider, $urlRouterProvider, cloudinaryProvider, AppConfig) {
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix("!");

            $urlRouterProvider.otherwise("/login");

            cloudinaryProvider
               .set("cloud_name", AppConfig.cloudinary.cloud_name)
               .set("upload_preset", AppConfig.cloudinary.upload_preset);
         }])
      .run(["$rootScope", "Auth", "$state",
         function ($rootScope, Auth, $state) {
            $rootScope.$on('$stateChangeStart', function (event, next, nextParams, from, fromParams) {
               var userPromise = Auth.getCurrentUser().$promise;

               if (from.skipAuthChecks || !next.authenticate) {
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