angular.module('coders').controller('pageCtrl', [
  '$routeParams', 'codersApi', 'codersAppUser', function($routeParams, codersApi, codersAppUser) {
    var _id, getPageUser, self;
    _id = $routeParams._id;
    self = this;
    self.page = {};
    self.user = codersAppUser.getAppUser();
    getPageUser = function() {
      return codersApi.getUser(_id).then(function(data) {
        self.page.user = data.data;
        if (self.user) {
          if (self.user._id === data.data._id) {
            return self.page.my = true;
          } else {
            return self.page.my = false;
          }
        } else {
          return self.page.my = false;
        }
      }, function(error) {
        return self.page.error = error;
      });
    };
    getPageUser();
  }
]);
