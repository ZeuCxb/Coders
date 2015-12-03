angular.module('coders').controller('pageCtrl', [
  '$routeParams', 'codersApi', 'codersAppUser', function($routeParams, codersApi, codersAppUser) {
    var _id, getPage, getPost, self;
    _id = $routeParams._id;
    self = this;
    self.page = {};
    self.user = codersAppUser.getAppUser();
    getPost = function() {
      return codersApi.getPost(_id).then(function(data) {
        return self.post = data.data;
      }, function() {
        return self.post = false;
      });
    };
    getPage = function() {
      codersApi.getUser(_id).then(function(data) {
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
      return getPost();
    };
    self.sendPost = function() {
      var message;
      message = {};
      message.text = self.msg;
      message.user = self.user._id;
      return codersApi.post(message).then(function(data) {
        getPost();
        return self.msg = '';
      });
    };
    self.delPost = function(_id) {
      return codersApi.delPost(_id);
    };
    getPage();
  }
]);
