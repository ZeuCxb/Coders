angular.module('coders').filter('firstName', function() {
  return function(input) {
    var name;
    name = input.split(' ');
    return name[0];
  };
});
