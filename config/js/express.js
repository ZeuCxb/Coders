var bodyParser, express, load;

express = require('express');

load = require('express-load');

bodyParser = require('body-parser');

module.exports = function() {
  var app;
  app = express();
  app.set('port', 3000);
  app.set('view engine', 'ejs');
  app.set('views', './app/views');
  app.use(express["static"]('./public'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(require('method-override')());
  app.disable('x-powered-by');
  load('models', {
    cwd: 'app'
  }).then('controllers').then('routes').into(app);
  app.get('*', function(req, res) {
    return res.status(404).render('404');
  });
  return app;
};
