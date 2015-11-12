angular.module 'coders', ['ngRoute']
	.config [
		'$routeProvider', ($routeProvider) ->
			$routeProvider.when '/',
				templateUrl: 'views/home.html'
			.otherwise
				redirectTo: '/'

			return
	]