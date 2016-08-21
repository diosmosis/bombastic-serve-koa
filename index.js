var fs = require('fs')

var distExists = false
try {
  distExists = fs.statSync().isDirectory()
} catch (err) {
  // ignore
}

module.exports = distExists ? require('./dist') : require('./lib')
