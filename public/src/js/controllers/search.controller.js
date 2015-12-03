angular.module('coders').controller('searchCtrl', [
  '$routeParams', 'codersApi', 'codersAppUser', function($routeParams, codersApi, codersAppUser) {
    var findUsers, search, self;
    search = $routeParams.search;
    self = this;
    self.user = codersAppUser.getAppUser();
    findUsers = function() {
      return codersApi.findUsers(search).then(function(users) {
        if (users.status === 'success') {
          return self.foundUsers = users.data;
        }
      });
    };
    findUsers();
  }
]);
