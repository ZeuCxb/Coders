bcrypt = require 'bcrypt'

module.exports = (app) ->
  userLogin = app.models.userLogin

  controller = {}

  # Login
  controller.login = (req, res) ->
    user = req.body.user
    login = user.login
    pass = user.pass

    userLogin.findOne $or: [{email: login}, {nick: login}]
      .exec()
      .then (user) ->
        if user != null
          bcrypt.compare pass, user.pass, (rq, rs) ->
            if rs
              res.json user
            else
              res.json 'pass error'
        else
          res.json 'login error'
      , (error) ->
        console.error error
        res.status(500).json error

  # Register
  controller.register = (req, res) ->
    user = req.body.user

    bcrypt.genSalt 10, (err, salt) ->
      bcrypt.hash user.pass, salt, (err, hash) ->
        user.pass = hash
        userLogin.create user
          .then (user) ->
            res.status(201).json user
          , (error) ->
            console.error error
            res.status(500).json error

  return controller
