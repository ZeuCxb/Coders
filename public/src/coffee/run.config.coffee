angular.module 'coders'
  .run [
    '$rootScope', ($rootScope) ->
      $rootScope.$on 'connect', (event, args) ->
        $rootScope.$broadcast 'connected', args
  ]
