request = require 'request-coders-api'

module.exports = (app) ->
  userSchema = app.models.user

  controller = {}

  controller.user = (req, res) ->
    _id = req.params._id

    userSchema.findById _id
      .exec()
      .then (user) ->
        if user != null
          request.json 'success', 'user found', user, res, 200
        else
          request.json 'error', 'user not found', '', res, 404
      , (error) ->
        request.json 'error', 'invalid id', error, res, 400

  controller.findUsers = (req, res) ->
    search = req.params.search

    userSchema.find $or: [{email: {$regex: search}}, {nick: {$regex: search}}]
      .sort nick: 1
      .exec()
      .then (users) ->
        if users.length > 0
          request.json 'success', 'users found', users, res, 200
        else
          request.json 'error', 'users not found', '', res, 404

  controller
