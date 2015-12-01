angular.module('coders').run([
  '$rootScope', function($rootScope) {
    return $rootScope.$on('connect', function(event, args) {
      return $rootScope.$broadcast('connected', args);
    });
  }
]);
