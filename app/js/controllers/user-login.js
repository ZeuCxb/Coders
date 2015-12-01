var bcrypt, request;

bcrypt = require('bcrypt');

request = require('request-coders-api');

module.exports = function(app) {
  var controller, userLogin;
  userLogin = app.models.userLogin;
  controller = {};
  controller.login = function(req, res) {
    var login, pass, user;
    user = req.body.user;
    login = user.login;
    pass = user.pass;
    return userLogin.findOne({
      $or: [
        {
          email: login
        }, {
          nick: login
        }
      ]
    }).exec().then(function(user) {
      if (user !== null && !req.session.data) {
        return bcrypt.compare(pass, user.pass, function(rq, rs) {
          var r;
          if (rs) {
            r = request.req('success', 'login success', user);
            req.session.data = r.data;
            return res.status(200).json(r);
          } else {
            return request.json('error', 'pass error', '', res, 500);
          }
        });
      } else {
        return request.json('error', 'login error', '', res, 500);
      }
    }, function(error) {
      console.error(error);
      return res.status(500).json(error);
    });
  };
  controller.connect = function(req, res) {
    if (req.session.data) {
      return request.json('success', 'connect success', req.session.data, res, 202, ['name', 'email', 'nick']);
    } else {
      return request.json('error', 'connect error', '', res, 204);
    }
  };
  controller.register = function(req, res) {
    var user;
    user = req.body.user;
    if (user !== null && !req.session.data) {
      return bcrypt.genSalt(10, function(err, salt) {
        return bcrypt.hash(user.pass, salt, function(err, hash) {
          user.pass = hash;
          return userLogin.create(user).then(function(user) {
            var r;
            r = request.req('success', 'register success', user);
            req.session.data = r.data;
            return res.status(201).json(r);
          }, function(error) {
            return request.json('error', 'register error', error, res, 500);
          });
        });
      });
    } else {
      return request.json('error', 'register error', '', res, 500);
    }
  };
  controller.logout = function(req, res) {
    if (req.session.data) {
      return req.session.destroy(function() {
        return res.redirect('/');
      });
    } else {
      return res.redirect('/');
    }
  };
  return controller;
};
