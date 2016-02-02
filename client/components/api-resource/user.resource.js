'use strict';

(function (angular) {

    angular.module("api")
        .factory("UserApi", function ($resource) {
            return $resource("/v1/api/users/:id/:controller", {id: "@_id"}, {});
        });

})(angular);