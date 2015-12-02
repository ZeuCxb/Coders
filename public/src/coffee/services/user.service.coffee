angular.module 'coders'
  .factory 'codersAppUser', [
  	() ->
      self = @

      self.user = {}

      setAppUser = (user) ->
        self.user = user

      getAppUser = ->
        self.user

      setAppUser: setAppUser
      getAppUser: getAppUser
  ]
