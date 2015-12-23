angular.module('coders').controller('titleCtrl', [
  'codersAppUser', '$scope', function(codersAppUser, $scope) {
    var self;
    self = this;
    self.title = 'CSC - A Social Community to learn, teach and grow up.';
    $scope.$on('connected', function(envent, args) {
      self.user = codersAppUser.getAppUser();
      if (self.user) {
        return self.title = 'CSC - ' + self.user.nick + ' (' + self.user.name + ')';
      }
    });
  }
]);
