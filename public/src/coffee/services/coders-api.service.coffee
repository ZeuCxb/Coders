angular.module 'coders'
  .factory 'codersApi', [
  	'$q', '$http', '$window', 'CONFIG', ($q, $http, $window, CONFIG) ->

      url = CONFIG.url
      urlLogOn = url + 'register'
      urlLogIn = url + 'login'
      urlLogOut = url + 'logout'
      urlUser = url + 'user'
      urlUsers = url + 'users'
      urlPost = url + 'post'

      connect = ->
        deferred = $q.defer()

        $http.get urlLogIn
          .success deferred.resolve
          .error deferred.reject

        deferred.promise

      format = (user) ->
        return '{"user": ' + JSON.stringify(user) + '}'

      logon = (user) ->
        deferred = $q.defer()

        user = format user

        $http.post urlLogOn, user
        	.success deferred.resolve
        	.error deferred.reject

        deferred.promise

      login = (user) ->
        deferred = $q.defer()

        user = format user

        $http.post urlLogIn, user
        	.success deferred.resolve
        	.error deferred.reject

        deferred.promise

      logout = ->
        deferred = $q.defer()

        $http.get urlLogOut
          .success deferred.resolve
          .error deferred.reject

        deferred.promise

      getUser = (_id) ->
        deferred = $q.defer()

        $http.get urlUser + '/' + _id
          .success deferred.resolve
          .error deferred.reject

        deferred.promise

      findUsers = (search) ->
        deferred = $q.defer()

        $http.get urlUsers + '/' + search
          .success deferred.resolve
          .error deferred.resolve

        deferred.promise

      post = (message) ->
        deferred = $q.defer()

        message = '{"message": ' + JSON.stringify(message) + '}'

        $http.post urlPost, message
        	.success deferred.resolve
        	.error deferred.reject

        deferred.promise

      getPost = (_id) ->
        deferred = $q.defer()

        $http.get urlPost + '/' + _id
        	.success deferred.resolve
        	.error deferred.reject

        deferred.promise

      delPost = (_id) ->
        deferred = $q.defer()

        $http.delete urlPost + '/' + _id
        	.success deferred.resolve
        	.error deferred.reject

      logon: logon
      login: login
      connect: connect
      logout: logout
      getUser: getUser
      findUsers: findUsers
      post: post
      getPost: getPost
      delPost: delPost
  ]
