var app, bodyParser, express, load, mehtodOverride, server;

express = require('express');

load = require('express-load');

bodyParser = require('body-parser');

mehtodOverride = require('method-override');

app = express();

server = require('http').Server(app);

app.set('port', process.env.PORT || 5000);

app.use(express["static"]('./public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(mehtodOverride('_method'));

app.disable('x-powered-by');

load('models', {
  cwd: 'app'
}).then('controllers').then('routes').into(app);

server.listen(app.get('port'), function() {
  console.log('Servidor Online.');
});
