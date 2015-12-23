angular.module 'coders'
	.controller 'titleCtrl', ['codersAppUser', '$scope', (codersAppUser, $scope) ->
		self = @

		self.title = 'CSC - A Social Community to learn, teach and grow up.'

		$scope.$on 'connected', (envent, args) ->
			self.user = codersAppUser.getAppUser()
			self.title = 'CSC - ' + self.user.nick + ' (' + self.user.name + ')' if self.user

		return
	]
