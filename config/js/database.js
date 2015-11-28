var mongoose;

mongoose = require('mongoose');

module.exports = function(uri) {
  mongoose.connect(uri);
  mongoose.connection.on('connected', function() {
    return console.log('Mongoose conectado em ' + uri);
  });
  mongoose.connection.on('disconnected', function() {
    return console.log('Mongoose desconectado de ' + uri);
  });
  mongoose.connection.on('error', function(error) {
    return console.log('Mongoose erro de conexão: ' + error);
  });
  return process.on('SIGINT', function() {
    return mongoose.connection.close(function() {
      console.log('Mongoose desconectado por termino da aplicação');
      return process.exit(0);
    });
  });
};
