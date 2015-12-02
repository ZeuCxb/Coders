module.exports = function(app) {
  var controller;
  controller = app.controllers.userFunctions;
  return app.route('/user/:_id').get(controller.user);
};
