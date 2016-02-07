'use strict';

(function (angular) {

   angular.module("api")
      .factory("InfoApi", function ($resource) {
         return $resource("/v1/api/info/:id/:controller", {"id": "@_id"}, {
            dashboard: {
               method: "GET",
               params: {
                  controller: "dashboard"
               }
            }
         });
      });

}(angular));