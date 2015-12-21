angular.module('coders').factory('codersApi', [
  '$q', '$http', '$window', function($q, $http, $window) {
    var connect, delPost, findUsers, format, getPost, getUser, login, logon, logout, post, url, urlLogIn, urlLogOn, urlLogOut, urlPost, urlUser, urlUsers;
    url = 'https://csc-beta.herokuapp.com/';
    urlLogOn = url + 'register';
    urlLogIn = url + 'login';
    urlLogOut = url + 'logout';
    urlUser = url + 'user';
    urlUsers = url + 'users';
    urlPost = url + 'post';
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
    post = function(message) {
      var deferred;
      deferred = $q.defer();
      message = '{"message": ' + JSON.stringify(message) + '}';
      $http.post(urlPost, message).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    };
    getPost = function(_id) {
      var deferred;
      deferred = $q.defer();
      $http.get(urlPost + '/' + _id).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    };
    delPost = function(_id) {
      return $http["delete"](urlPost + '/' + _id).success($window.location.reload());
    };
    return {
      logon: logon,
      login: login,
      connect: connect,
      logout: logout,
      getUser: getUser,
      findUsers: findUsers,
      post: post,
      getPost: getPost,
      delPost: delPost
    };
  }
]);
