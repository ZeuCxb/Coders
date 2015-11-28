var mongoose;

mongoose = require('mongoose');

module.exports = function() {
  var schema;
  schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    pass: {
      type: String,
      required: true
    },
    nick: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    }
  });
  return mongoose.model('userLogin', schema);
};
