request = require 'request-coders-api'
neo4j = require 'neo4j'
gdb = new neo4j.GraphDatabase 'http://app45295032:jEvzAMVFTDxAAUumc63x@app45295032.sb02.stations.graphenedb.com:24789'

module.exports = (app) ->
  userSchema = app.models.user
  postSchema = app.models.post

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

  controller.post = (req, res) ->
    message = req.body.message

    if message != null
      postSchema.create message
        .then (msg) ->
          gdb.cypher
            query: 'MATCH (user:User) WHERE user._id = "' + msg.user + '" CREATE (post:Post {_id: "' + msg._id + '"}) CREATE (user)-[r:POST]->(post)'
          , (error, results) ->
            if error
              console.error error
              request.json 'error', 'post error', error, res, 500
            else
              request.json 'success', 'post success', msg, res, 201
        , (error) ->
          request.json 'error', 'post error', error, res, 500
    else
      request.json 'error', 'post error', '', res, 500

  controller.getPost = (req, res) ->
    _id = req.params._id

    postSchema.find {user: _id, status: true}
      .sort date: -1
      .exec()
      .then (users) ->
        if users.length > 0
          request.json 'success', 'post found', users, res, 200
        else
          request.json 'error', 'post not found', '', res, 404

  controller.delPost = (req, res) ->
    _id = req.params._id

    postSchema.findByIdAndUpdate {_id: _id}, {status: false}
      .exec()
      .then (msg) ->
        gdb.cypher
          query: 'MATCH (post:Post), (user)-[r]-(post) WHERE post._id = "' + msg._id + '" DELETE post, r'
        , (error, results) ->
          if error
            console.error error
            request.json 'error', 'post not deleted', error, res, 500
          else
            request.json 'success', 'post deleted', msg, res, 200

  controller
