'use strict';

(function (angular) {

   angular.module("api")
      .config(["$stateProvider", function ($stateProvider) {
         $stateProvider
            .state("main", {
               url: "/",
               abstract: true,
               templateUrl: "app/main.html",
               controller: "MainCtrl as MainCtrl"
            })
            .state("login", {
               url: "/login",
               templateUrl: "app/auth/login.html",
               controller: "LoginCtrl as LoginCtrl"
            })
            .state("main.dashboard", {
               url: "dashboard",
               authenticate: true,
               templateUrl: "app/dashboard/dashboard.html",
               controller: "DashboardCtrl as DashCtrl"
            })
            .state("main.dashboard.sessions", {
               url: "/sessions",
               authenticate: true,
               templateUrl: "app/session/session.html",
               controller: "SessionCtrl as SessionCtrl"
            })
            .state("main.dashboard.users", {
               url: "/users",
               authenticate: true,
               templateUrl: "app/users/user.html",
               controller: "UserCtrl as UserCtrl"
            })
            .state("main.dashboard.bootcamp", {
               url: "/bootcamp",
               authenticate: true,
               templateUrl: "app/bootcamp/bootcamp.html",
               controller: "BootcampCtrl as BootcampCtrl"
            });
      }]);

})(angular);