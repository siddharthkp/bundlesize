/*
The contents of this file aren't important,
what's important is the size

269B gzip
240B brotli
437B without compression

*/

const { inspect } = require('util')
const files = require('./src/files')
const reporter = require('./src/reporter')
const build = require('./src/build')

reporter(files)

process.on('unhandledRejection', function(reason) {
  console.log('Unhandled Promise')
  console.log(inspect(reason))
  build.error()
})
