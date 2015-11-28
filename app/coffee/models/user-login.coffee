mongoose = require 'mongoose'

module.exports = ->
  schema = mongoose.Schema
    name:
      type: String
      required: true
    email:
      type: String
      required: true
      index:
        unique: true
    pass:
      type: String
      required: true
    nick:
      type: String
      required: true
      index:
        unique: true

  return mongoose.model 'UserLogin', schema
