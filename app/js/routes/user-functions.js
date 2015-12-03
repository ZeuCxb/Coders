module.exports = function(app) {
  var controller;
  controller = app.controllers.userFunctions;
  app.route('/user/:_id').get(controller.user);
  return app.route('/users/:search').get(controller.findUsers);
};
