var app, http;

http = require('http');

app = require('./config/js/express')();

require('./config/js/database.js')('mongodb://localhost/coders');

http.createServer(app).listen(app.get('port'), function() {
  return console.log('Servidor na porta: ' + app.get('port'));
});
