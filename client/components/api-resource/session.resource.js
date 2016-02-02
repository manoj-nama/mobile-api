'use strict';

(function (angular) {

    angular.module("api")
        .factory("SessionApi", ["$resource", function ($resource) {
            return $resource("/v1/api/sessions/:id/:controller", {"id": "@_id"}, {
               list: {
                  method: "GET"
               }
            });
        }]);

}(angular));