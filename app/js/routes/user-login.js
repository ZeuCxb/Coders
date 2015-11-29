module.exports = function(app) {
  var controller;
  controller = app.controllers.userLogin;
  app.route('/login').post(controller.login);
  app.route('/register').post(controller.register);
  return app.route('/logout').get(controller.logout);
};
