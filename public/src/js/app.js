angular.module('coders', ['ngRoute']).config([
  '$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/home.html'
    }).otherwise({
      redirectTo: '/'
    });
  }
]);
