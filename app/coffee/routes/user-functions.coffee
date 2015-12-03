module.exports = (app) ->
  controller = app.controllers.userFunctions

  app.route '/user/:_id'
    .get controller.user

  app.route '/post/'
    .post controller.post

  app.route '/post/:_id'
    .get controller.getPost
    .delete controller.delPost

  app.route '/users/:search'
    .get controller.findUsers
