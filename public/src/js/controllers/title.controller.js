angular.module('coders').controller('titleCtrl', [
  '$scope', function($scope) {
    var self;
    self = this;
    self.title = 'CSC - A Social Community to learn, teach and grow up.';
    $scope.$on('connected', function(envent, args) {
      if (args) {
        return self.title = 'CSC - ' + args.nick;
      }
    });
  }
]);
