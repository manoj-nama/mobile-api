'use strict';

(function (angular) {

	angular.module("api")
	.factory("Auth", function (UserApi, $cookieStore, $q, $http) {
		var currentUser = {};

		function getUser() {
			if ($cookieStore.get('token')) {
				currentUser = UserApi.get();
				return currentUser;
			}
		}
		getUser();

		function _setCookie(key, value, options) {
			jQuery.cookie && jQuery.cookie(key, value, options);
		}

		function _getCookie(key) {
			jQuery.cookie && jQuery.cookie(key);
		}

		return {
			login: function (user, callback) {
				var deferred = $q.defer();
				callback = callback || angular.noop;

				$http.post("/auth/local", user)
				.success(function (data) {
					currentUser = UserApi.get();
					deferred.resolve(data);
					return callback(null, data);
				})
				.error(function (err) {
					console.log(err);
					deferred.reject(err);
					return callback(err);
				});


				return deferred.promise;
			},
			logout: function (callback) {
				callback && callback(currentUser);
				currentUser = {};
			},
			getCurrentUser: function (refresh) {
				if (refresh) {
					return getUser();
				} else {
					return currentUser;
				}
			},
			setCookie: _setCookie,
			getCookie: _getCookie
		}

	});

})(angular);