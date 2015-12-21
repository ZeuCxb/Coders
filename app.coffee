http = require 'http'
app = require('./config/js/express')()

require('./config/js/database.js')('mongodb://heroku_3zk0h9nh:g8s6kbtvocb7q1ertvfgdr5kap@ds033875.mongolab.com:33875/heroku_3zk0h9nh')

http.createServer(app).listen app.get('port'), ->
	console.log 'Servidor na porta: ' + app.get 'port'
