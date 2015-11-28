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
      if (user !== null) {
        return bcrypt.compare(pass, user.pass, function(rq, rs) {
          if (rs) {
            return res.json(user);
          } else {
            return res.json('pass error');
          }
        });
      } else {
        return res.json('login error');
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
          return res.status(201).json(user);
        }, function(error) {
          console.error(error);
          return res.status(500).json(error);
        });
      });
    });
  };
  return controller;
};
