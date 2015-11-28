var app, http;

http = require('http');

app = require('./config/js/express')();

http.createServer(app).listen(app.get('port'), function() {
  return console.log('Servidor na porta: ' + app.get('port'));
});
