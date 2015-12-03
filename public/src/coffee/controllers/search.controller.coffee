angular.module 'coders'
  .controller 'searchCtrl', ['$routeParams', 'codersApi', 'codersAppUser', ($routeParams, codersApi, codersAppUser) ->
    search = $routeParams.search

    self = @

    self.user = codersAppUser.getAppUser()

    findUsers = ->
      codersApi.findUsers(search)
        .then (users) ->
          if users.status is 'success'
            self.foundUsers = users.data

    findUsers()

    return
  ]
