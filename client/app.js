'use strict';

(function (angular) {

    angular.module("api", ["ui.router", "ui.bootstrap", "ngResource"])
        .config(["$locationProvider", "$urlRouterProvider", function ($locationProvider, $urlRouterProvider) {
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix("!");

            $urlRouterProvider.otherwise("/login");
        }])
        .run(["$rootScope", function ($rootScope) {
            $rootScope.$on('$stateChangeStart', function (event, next, nextParams, from, fromParams) {
                if(next.authenticate) {
                    console.log("Moving to an authenticated page, allowing for the time being, " +
                       "Won't work in future");
                }
            });
        }]);

})(angular);