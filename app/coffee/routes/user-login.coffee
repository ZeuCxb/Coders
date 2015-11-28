module.exports = (app) ->
  controller = app.controllers.userLogin

  app.route '/login'
    .post controller.login

  app.route '/register'
    .post controller.register
