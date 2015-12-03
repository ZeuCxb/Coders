var request;

request = require('request-coders-api');

module.exports = function(app) {
  var controller, userSchema;
  userSchema = app.models.user;
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
  return controller;
};
