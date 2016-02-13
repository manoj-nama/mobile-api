'use strict';

(function (angular) {

   angular.module("api")
      .directive("scrollHeader", [function () {
         return {
            restrict: "AE",
            scope: {},
            link: function (scope, elem, attrs) {
               var $window = $(window),
                  scrollOffset = attrs.scrollOffset || 50,
                  timer;

               $window.on("scroll", function() {
                  window.clearTimeout(timer);
                  timer = setTimeout(function () {
                     console.log(">>>>", $window.scrollTop());
                     if($window.scrollTop() > scrollOffset) {
                        $(elem).addClass("scrolled");
                     } else {
                        $(elem).removeClass("scrolled");
                     }
                  }, 100);
               });
            }
         }
      }]);

}(angular));