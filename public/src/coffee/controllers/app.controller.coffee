angular.module 'coders'
  .controller 'appCtrl', ['codersApi', '$location', '$window', (codersApi, $location, $window) ->
    self = @

    connect = ->
      codersApi.connect()
        .then (data) ->
          self.user = data.data
          console.log self.user
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

    connect()

    return
  ]
