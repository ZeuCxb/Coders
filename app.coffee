http = require 'http'
app = require('./config/js/express')()

http.createServer(app).listen app.get('port'), ->
	console.log 'Servidor na porta: ' + app.get 'port'
