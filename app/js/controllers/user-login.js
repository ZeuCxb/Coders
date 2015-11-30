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
      var r;
      if (user !== null && !req.session.data) {
        return bcrypt.compare(pass, user.pass, function(rq, rs) {
          var r;
          if (rs) {
            r = request.req('success', 'login success', user);
            req.session.data = r.data;
            return res.status(200).json(r);
          } else {
            r = request.req('error', 'pass error');
            return res.status(500).json(r);
          }
        });
      } else {
        r = request.req('error', 'login error');
        return res.status(500).json(r);
      }
    }, function(error) {
      console.error(error);
      return res.status(500).json(error);
    });
  };
  controller.register = function(req, res) {
    var r, user;
    user = req.body.user;
    if (req.headers['content-type'] === 'application/json') {
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
              var r;
              r = request.req('error', 'register error', error);
              return res.status(500).json(r);
            });
          });
        });
      } else {
        r = request.req('error', 'register error');
        return res.status(500).json(r);
      }
    } else {
      r = request.req('error', 'header error');
      return res.status(500).json(r);
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
