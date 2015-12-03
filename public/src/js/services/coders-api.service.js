angular.module('coders').factory('codersApi', [
  '$q', '$http', function($q, $http) {
    var connect, findUsers, format, getUser, login, logon, logout, url, urlLogIn, urlLogOn, urlLogOut, urlUser, urlUsers;
    url = 'http://localhost:5000/';
    urlLogOn = url + 'register';
    urlLogIn = url + 'login';
    urlLogOut = url + 'logout';
    urlUser = url + 'user';
    urlUsers = url + 'users';
    connect = function() {
      var deferred;
      deferred = $q.defer();
      $http.get(urlLogIn).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    };
    format = function(user) {
      return '{"user": ' + JSON.stringify(user) + '}';
    };
    logon = function(user) {
      var deferred;
      deferred = $q.defer();
      user = format(user);
      $http.post(urlLogOn, user).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    };
    login = function(user) {
      var deferred;
      deferred = $q.defer();
      user = format(user);
      $http.post(urlLogIn, user).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    };
    logout = function() {
      var deferred;
      deferred = $q.defer();
      $http.get(urlLogOut).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    };
    getUser = function(_id) {
      var deferred;
      deferred = $q.defer();
      $http.get(urlUser + '/' + _id).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    };
    findUsers = function(search) {
      var deferred;
      deferred = $q.defer();
      $http.get(urlUsers + '/' + search).success(deferred.resolve).error(deferred.resolve);
      return deferred.promise;
    };
    return {
      logon: logon,
      login: login,
      connect: connect,
      logout: logout,
      getUser: getUser,
      findUsers: findUsers
    };
  }
]);
