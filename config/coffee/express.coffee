express = require 'express'
redis = require 'redis'
session = require 'express-session'
redisStore = require('connect-redis')(session)
client = redis.createClient()
load = require 'express-load'
bodyParser = require 'body-parser'

module.exports = ->
	app = express()

	app.set 'port', (process.env.PORT || 5000)

	app.set 'view engine', 'ejs'
	app.set 'views', './app/views'

	app.use session (
    secret: 'pepo'
    store: new redisStore({host: 'ec2-54-243-135-236.compute-1.amazonaws.com', port: 10699, client: client})
		)

	app.use (req, res, next) ->
    if !req.session
      return next new Error 'oh no'
    next()

	app.use express.static './public'
	app.use bodyParser.urlencoded extended: true
	app.use bodyParser.json()
	app.use require('method-override')()

	app.disable 'x-powered-by'

	load 'models', cwd: './app/js'
		.then 'controllers'
		.then 'routes'
		.into app

	app.get '*', (req, res) ->
		res.status(404).render '404'

	return app
