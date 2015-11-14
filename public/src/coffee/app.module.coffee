angular.module 'coders', ['ngRoute']
	.config [
		'$routeProvider', ($routeProvider) ->
			$routeProvider.when '/',
				templateUrl: 'views/home.html'
			$routeProvider.when '/teste',
				templateUrl: 'views/teste.html'
			.otherwise
				redirectTo: '/'

			return
	]
