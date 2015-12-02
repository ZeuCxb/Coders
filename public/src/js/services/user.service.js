angular.module('coders').factory('codersAppUser', [
  function() {
    var getAppUser, self, setAppUser;
    self = this;
    self.user = {};
    setAppUser = function(user) {
      return self.user = user;
    };
    getAppUser = function() {
      return self.user;
    };
    return {
      setAppUser: setAppUser,
      getAppUser: getAppUser
    };
  }
]);
