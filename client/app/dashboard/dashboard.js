'use strict';

(function (angular) {

	angular.module("api")
		.config(function ($stateProvider) {

			$stateProvider
			.state("main.dashboard", {
				url: "dashboard",
				authenticate: true,
				templateUrl: "app/dashboard/dashboard.html",
				controller: "DashboardCtrl as DashCtrl"
			});
		});

})(angular);