angular.module 'coders'
  .config [
    '$routeProvider', ($routeProvider) ->
      $routeProvider.when '/',
        templateUrl: 'views/home.html'
      $routeProvider.when '/page/:_id',
        templateUrl: 'views/page.html'
      .otherwise
        redirectTo: '/'

      return
  ]
