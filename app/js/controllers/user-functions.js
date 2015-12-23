var gdb, neo4j, request;

request = require('request-coders-api');

neo4j = require('neo4j');

gdb = new neo4j.GraphDatabase(process.env.GRAPHENEDB_URL || 'http://localhost:7474/');

module.exports = function(app) {
  var controller, postSchema, userSchema;
  userSchema = app.models.user;
  postSchema = app.models.post;
  controller = {};
  controller.user = function(req, res) {
    var _id;
    _id = req.params._id;
    return userSchema.findById(_id).exec().then(function(user) {
      if (user !== null) {
        return request.json('success', 'user found', user, res, 200);
      } else {
        return request.json('error', 'user not found', '', res, 404);
      }
    }, function(error) {
      return request.json('error', 'invalid id', error, res, 400);
    });
  };
  controller.findUsers = function(req, res) {
    var search;
    search = req.params.search;
    return userSchema.find({
      $or: [
        {
          email: {
            $regex: search
          }
        }, {
          nick: {
            $regex: search
          }
        }
      ]
    }).sort({
      nick: 1
    }).exec().then(function(users) {
      if (users.length > 0) {
        return request.json('success', 'users found', users, res, 200);
      } else {
        return request.json('error', 'users not found', '', res, 404);
      }
    });
  };
  controller.post = function(req, res) {
    var message;
    message = req.body.message;
    if (message !== null) {
      return postSchema.create(message).then(function(msg) {
        return gdb.cypher({
          query: 'MATCH (user:User) WHERE user._id = "' + msg.user + '" CREATE (post:Post {_id: "' + msg._id + '"}) CREATE (user)-[r:POST]->(post)'
        }, function(error, results) {
          if (error) {
            console.error(error);
            return request.json('error', 'post error', error, res, 500);
          } else {
            return request.json('success', 'post success', msg, res, 201);
          }
        });
      }, function(error) {
        return request.json('error', 'post error', error, res, 500);
      });
    } else {
      return request.json('error', 'post error', '', res, 500);
    }
  };
  controller.getPost = function(req, res) {
    var _id;
    _id = req.params._id;
    return postSchema.find({
      user: _id,
      status: true
    }).sort({
      date: -1
    }).exec().then(function(users) {
      if (users.length > 0) {
        return request.json('success', 'post found', users, res, 200);
      } else {
        return request.json('error', 'post not found', '', res, 404);
      }
    });
  };
  controller.delPost = function(req, res) {
    var _id;
    _id = req.params._id;
    return postSchema.findByIdAndUpdate({
      _id: _id
    }, {
      status: false
    }).exec().then(function(msg) {
      return gdb.cypher({
        query: 'MATCH (post:Post), (user)-[r]-(post) WHERE post._id = "' + msg._id + '" DELETE post, r'
      }, function(error, results) {
        if (error) {
          console.error(error);
          return request.json('error', 'post not deleted', error, res, 500);
        } else {
          return request.json('success', 'post deleted', msg, res, 200);
        }
      });
    });
  };
  return controller;
};
