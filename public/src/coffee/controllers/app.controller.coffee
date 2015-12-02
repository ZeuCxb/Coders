angular.module 'coders'
  .controller 'appCtrl', ['codersApi', 'codersAppUser', '$location', '$window', '$scope', (codersApi, codersAppUser, $location, $window, $scope) ->
    self = @

    connect = ->
      codersApi.connect()
        .then (data) ->
          self.user = data.data
          codersAppUser.setAppUser self.user
          $scope.$emit 'connect', self.user
        , () ->
          self.user = {}

    self.logOn = ->
      if self.logonUser
        user = self.logonUser

        delete user.cpass
        user.email = user.email.toLowerCase()
        user.name = user.name.toLowerCase()
        user.nick = user.nick.toLowerCase()

        codersApi.logon user
          .then (data) ->
            $window.location.reload()
          , (error) ->
            if error.status == 'error'
              if error.data
                email = error.data.errmsg.search('email')
                nick = error.data.errmsg.search('nick')

                self.error = {}

                if email > 0
                  self.error.email = true
                if nick > 0
                  self.error.nick = true
              else
                $window.location.reload()

    self.logIn = ->
      if self.loginUser
        user = self.loginUser

        user.login = user.login.toLowerCase()

        codersApi.login user
          .then (data) ->
            $window.location.reload()
          , (error) ->
            self.error = {}

            console.log error

            self.error.login = true
            self.error.pass = true

    self.logOut = ->
      if self.user
        codersApi.logout()
          .then ->
            $window.location.reload()

    connect()

    return
  ]
