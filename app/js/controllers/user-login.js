var bcrypt;

bcrypt = require('bcrypt');

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
      r = {};
      if (user !== null) {
        return bcrypt.compare(pass, user.pass, function(rq, rs) {
          if (rs) {
            r.status = 'success';
            r.data = user;
            req.session.key = r;
            return res.status(200).json(r);
          } else {
            r.status = 'error';
            r.data = 'pass error';
            return res.status(500).json(r);
          }
        });
      } else {
        r.status = 'error';
        r.data = 'login error';
        return res.status(500).json(r);
      }
    }, function(error) {
      console.error(error);
      return res.status(500).json(error);
    });
  };
  controller.register = function(req, res) {
    var user;
    user = req.body.user;
    return bcrypt.genSalt(10, function(err, salt) {
      return bcrypt.hash(user.pass, salt, function(err, hash) {
        user.pass = hash;
        return userLogin.create(user).then(function(user) {
          r.status = 'success';
          r.data = user;
          req.session.key = r;
          return res.status(201).json(r);
        }, function(error) {
          console.error(error);
          return res.status(500).json(error);
        });
      });
    });
  };
  controller.logout = function(req, res) {
    if (req.session.key) {
      return req.session.destroy(function() {
        return res.redirect('/');
      });
    } else {
      return res.redirect('/');
    }
  };
  return controller;
};
