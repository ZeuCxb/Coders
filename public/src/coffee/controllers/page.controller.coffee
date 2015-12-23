angular.module 'coders'
  .controller 'pageCtrl', ['$routeParams', 'codersApi', 'codersAppUser', ($routeParams, codersApi, codersAppUser) ->
    _id = $routeParams._id

    self = @

    self.page = {}

    self.user = codersAppUser.getAppUser()

    getPost = ->
      codersApi.getPost(_id)
        .then (data) ->
          self.post = data.data
        , ->
          self.post = false

    getPage = ->
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

      getPost()

    self.sendPost = ->
      message = {}

      message.text = self.msg
      message.user = self.user._id

      codersApi.post message
        .then (data) ->
          getPost()
          self.msg = ''

    self.delPost = (_id) ->
      codersApi.delPost _id
        .then (data) ->
          getPost()


    getPage()

    return
  ]
