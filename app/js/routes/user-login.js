module.exports = function(app) {
  var controller;
  controller = app.controllers.userLogin;
  app.route('/login').post(controller.login);
  return app.route('/register').post(controller.register);
};
