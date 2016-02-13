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
            .state("main.sessions", {
               url: "sessions",
               authenticate: true,
               templateUrl: "app/session/session.html",
               controller: "SessionCtrl as SessionCtrl"
            })
            .state("main.sessions.detail", {
               url: "/show/:sessionId",
               authenticate: true,
               templateUrl: "app/session/session.detail.html",
               controller: "SessionDetailCtrl as SessionDetailCtrl"
            })
            .state("main.sessions.create", {
               url: "/new",
               authenticate: true,
               templateUrl: "app/session/session.form.html",
               controller: "SessionFormCtrl as SessionCtrl"
            })
            .state("main.sessions.edit", {
               url: "/edit/:sessionId",
               authenticate: true,
               templateUrl: "app/session/session.form.html",
               controller: "SessionFormCtrl as SessionCtrl"
            })
            .state("main.users", {
               url: "users",
               authenticate: true,
               templateUrl: "app/users/user.html",
               controller: "UserCtrl as UserCtrl"
            })
            .state("main.users.detail", {
               url: "/:userId",
               authenticate: true,
               templateUrl: "app/users/user.detail.html",
               controller: "UserDetailCtrl as UserCtrl"
            })
            .state("main.bootcamp", {
               url: "bootcamp",
               authenticate: true,
               templateUrl: "app/bootcamp/bootcamp.html",
               controller: "BootcampCtrl as BootcampCtrl"
            })
            .state("main.bootcamp.detail", {
               url: "/show/:bootcampId",
               authenticate: true,
               templateUrl: "app/bootcamp/bootcamp.detail.html",
               controller: "BootcampDetailCtrl as BootcampCtrl"
            })
            .state("main.bootcamp.create", {
               url: "/new",
               authenticate: true,
               templateUrl: "app/bootcamp/bootcamp.form.html",
               controller: "BootcampFormCtrl as BootcampCtrl"
            })
            .state("main.bootcamp.edit", {
               url: "/edit/:bootcampId",
               authenticate: true,
               templateUrl: "app/bootcamp/bootcamp.form.html",
               controller: "BootcampFormCtrl as BootcampCtrl"
            });
      }]);

})(angular);