module.exports = (app) ->
  controller = app.controllers.userFunctions

  app.route '/user/:_id'
    .get controller.user
