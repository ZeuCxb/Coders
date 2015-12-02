angular.module 'coders'
  .factory 'codersApi', [
  	'$q', '$http', ($q, $http) ->

      url = 'http://localhost:5000/'
      urlLogOn = url + 'register'
      urlLogIn = url + 'login'
      urlLogOut = url + 'logout'
      urlUser = url + 'user'

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

      logon: logon
      login: login
      connect: connect
      logout: logout
      getUser: getUser
  ]
