var request;

request = require('request-coders-api');

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
      return postSchema.create(message).then(function(user) {
        return request.json('success', 'post success', message, res, 201);
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
    }).exec().then(function(data) {
      return request.json('success', 'post deleted', users, res, 200);
    });
  };
  return controller;
};
