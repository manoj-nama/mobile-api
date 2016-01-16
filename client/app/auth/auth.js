'use strict';

(function (angular) {

    angular.module("api")
        .config(function ($stateProvider) {

            $stateProvider
                .state("login", {
                    url: "/login",
                    templateUrl: "app/auth/login.html",
                    controller: "LoginCtrl as LoginCtrl"
                });
        });

})(angular);