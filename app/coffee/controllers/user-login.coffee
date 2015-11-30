bcrypt = require 'bcrypt'
request = require 'request-coders-api'

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

        if user != null and !req.session.data
          bcrypt.compare pass, user.pass, (rq, rs) ->
            if rs
              r = request.req 'success', 'login success', user

              req.session.data = r.data

              res.status(200).json r
            else
              r = request.req 'error', 'pass error'

              res.status(500).json r
        else
          r = request.req 'error', 'login error'

          res.status(500).json r
      , (error) ->
        console.error error
        res.status(500).json error

  # Register
  controller.register = (req, res) ->
    user = req.body.user

    if req.headers['content-type'] == 'application/json'
      if user != null and !req.session.data
        bcrypt.genSalt 10, (err, salt) ->
          bcrypt.hash user.pass, salt, (err, hash) ->
            user.pass = hash
            userLogin.create user
              .then (user) ->
                r = request.req 'success', 'register success', user

                req.session.data = r.data

                res.status(201).json r
              , (error) ->
                r = request.req 'error', 'register error', error

                res.status(500).json r
      else
        r = request.req 'error', 'register error'

        res.status(500).json r
    else
      r = request.req 'error', 'header error'

      res.status(500).json r

  # Logout
  controller.logout = (req, res) ->
    if req.session.data
      req.session.destroy ->
        res.redirect '/'
    else
      res.redirect '/'

  return controller
