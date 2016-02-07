'use strict';

(function (angular) {

   angular.module("api")
      .factory("BootcampApi", function ($resource) {
         return $resource("/v1/api/bootcamps/:id/:controller", {"id": "@_id"}, {
            list: {
               method: "GET"
            }
         });
      });

}(angular));