angular.module 'coders'
  .controller 'pageCtrl', ['$routeParams', 'codersApi', 'codersAppUser', ($routeParams, codersApi, codersAppUser) ->
    _id = $routeParams._id

    self = @

    self.page = {}

    self.user = codersAppUser.getAppUser()

    getPageUser = ->
      codersApi.getUser(_id)
        .then (data) ->
          self.page.user = data.data

          if self.user
            if self.user._id is data.data._id
              self.page.my = true
            else
              self.page.my = false
          else
            self.page.my = false
        , (error) ->
          self.page.error = error

    getPageUser()

    return
  ]
