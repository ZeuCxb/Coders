angular.module 'coders'
	.controller 'titleCtrl', ['$scope', ($scope) ->
		self = @

		self.title = 'CSC - A Social Community to learn, teach and grow up.'

		$scope.$on 'connected', (envent, args) ->
			self.title = 'CSC - ' + args.nick if args

		return
	]
