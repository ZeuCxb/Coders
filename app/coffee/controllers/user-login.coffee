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
        r = {}

        if user != null
          bcrypt.compare pass, user.pass, (rq, rs) ->
            if rs
              r.status = 'success'
              r.data = user

              req.session._id = user._id

              res.status(200).json r
            else
              r.status = 'error'
              r.data = 'pass error'

              res.status(500).json r
        else
          r.status = 'error'
          r.data = 'login error'

          res.status(500).json r
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
            r.status = 'success'
            r.data = user

            req.session._id = user._id

            res.status(201).json r
          , (error) ->
            console.error error
            res.status(500).json error

  return controller
