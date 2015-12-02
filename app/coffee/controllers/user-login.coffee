bcrypt = require 'bcrypt'
request = require 'request-coders-api'

module.exports = (app) ->
  userSchema = app.models.user

  controller = {}

  # Login
  controller.login = (req, res) ->
    user = req.body.user
    login = user.login
    pass = user.pass

    userSchema.findOne $or: [{email: login}, {nick: login}]
      .exec()
      .then (user) ->

        if user != null and !req.session.data
          bcrypt.compare pass, user.pass, (rq, rs) ->
            if rs
              r = request.req 'success', 'login success', user

              req.session.data = r.data

              res.status(200).json r
            else
              request.json 'error', 'pass error', '', res, 500
        else
          request.json 'error', 'login error', '', res, 500
      , (error) ->
        console.error error
        res.status(500).json error

  # Connect
  controller.connect = (req, res) ->
    if req.session.data
      request.json 'success', 'connect success', req.session.data, res, 202
    else
      request.json 'error', 'connect error', '', res, 204

  # Register
  controller.register = (req, res) ->
    user = req.body.user

    if user != null and !req.session.data
      bcrypt.genSalt 10, (err, salt) ->
        bcrypt.hash user.pass, salt, (err, hash) ->
          user.pass = hash
          userSchema.create user
            .then (user) ->
              r = request.req 'success', 'register success', user

              req.session.data = r.data

              res.status(201).json r
            , (error) ->
              request.json 'error', 'register error', error, res, 500
    else
      request.json 'error', 'register error', '', res, 500

  # Logout
  controller.logout = (req, res) ->
    if req.session.data
      req.session.destroy ->
        res.redirect '/'
    else
      res.redirect '/'

  controller
