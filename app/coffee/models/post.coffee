mongoose = require 'mongoose'

module.exports = ->
  schema = mongoose.Schema
    text:
      type: String
      required: true
    user:
      type: mongoose.Schema.ObjectId,
      ref: 'user'
    date:
      type: Date
      default: Date.now
    status:
      type: Boolean
      default: 1

  return mongoose.model 'post', schema
