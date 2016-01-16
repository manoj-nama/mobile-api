'use strict';

(function (angular) {

    angular.module("api")
        .config(function ($stateProvider) {

            $stateProvider
                .state("main", {
                    url: "/",
                    abstract: true,
                    templateUrl: "app/main.html",
                    controller: "MainCtrl as MainCtrl"
                });
        });

})(angular);