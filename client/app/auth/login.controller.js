'use strict';

(function (angular) {

    angular.module("api")
        .controller("LoginCtrl", function () {
            var LoginCtrl = this;
            LoginCtrl.form = {};
            console.log("LoginCtrl");
        });

})(angular);