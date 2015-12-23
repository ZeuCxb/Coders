angular.module('coders').controller('appCtrl', [
  'codersApi', 'codersAppUser', '$location', '$window', '$scope', function(codersApi, codersAppUser, $location, $window, $scope) {
    var connect, self;
    self = this;
    connect = function() {
      return codersApi.connect().then(function(data) {
        self.user = data.data;
        codersAppUser.setAppUser(self.user);
        return $scope.$emit('connect', '');
      }, function() {
        return self.user = {};
      });
    };
    self.logOn = function() {
      var user;
      if (self.logonUser) {
        user = self.logonUser;
        delete user.cpass;
        user.email = user.email.toLowerCase();
        user.name = user.name.toLowerCase();
        user.nick = user.nick.toLowerCase();
        return codersApi.logon(user).then(function(data) {
          return $window.location.reload();
        }, function(error) {
          var email, nick;
          if (error.status === 'error') {
            if (error.data) {
              email = error.data.errmsg.search('email');
              nick = error.data.errmsg.search('nick');
              self.error = {};
              if (email > 0) {
                self.error.email = true;
              }
              if (nick > 0) {
                return self.error.nick = true;
              }
            } else {
              return $window.location.reload();
            }
          }
        });
      }
    };
    self.logIn = function() {
      var user;
      if (self.loginUser) {
        user = self.loginUser;
        user.login = user.login.toLowerCase();
        return codersApi.login(user).then(function(data) {
          return $window.location.reload();
        }, function(error) {
          self.error = {};
          console.log(error);
          self.error.login = true;
          return self.error.pass = true;
        });
      }
    };
    self.logOut = function() {
      if (self.user) {
        return codersApi.logout().then(function() {
          return $window.location.reload();
        });
      }
    };
    connect();
  }
]);
