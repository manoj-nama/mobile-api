'use strict';

(function (angular) {

    angular.module("api")
        .factory("SessionApi", function ($resource) {
            return $resource("/v1/api/sessions/:id/:controller", {"id": "@_id"}, {

            });
        });

}(angular));