'use strict'

module.exports.getAll = function* getAll() {
  this.body = 'getAll called'
}

module.exports.create = function* create() {
  this.body = 'create called'
}

module.exports.get = function* get() {
  this.body = 'get called'
}
