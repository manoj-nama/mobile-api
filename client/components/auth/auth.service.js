'use strict';

(function (angular) {

   angular.module("api")
      .factory("Auth", ["UserApi", "$cookieStore", "$q", "$http", function (UserApi, $cookieStore, $q, $http) {
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
               var deferred = $q.defer(),
                  self = this;
               callback = callback || angular.noop;

               $http.post("/auth/local", user)
                  .success(function (data) {
                     _setCookie('token', JSON.stringify(data.token));
                     currentUser = UserApi.get();
                     deferred.resolve(data);
                     return callback(null, data);
                  })
                  .error(function (err) {
                     self.logout();
                     deferred.reject(err);
                     return callback(err);
                  });

               return deferred.promise;
            },
            logout: function (callback) {
               $cookieStore.remove('token');
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
            /**
             * Check if a user is logged in
             *
             * @return {Boolean}
             */
            isLoggedIn: function () {
               return currentUser.hasOwnProperty('role');
            },
            setCookie: _setCookie,
            getCookie: _getCookie
         }

      }]);

})(angular);