#!/usr/bin/env node

const files = require('./src/files')
const reporter = require('./src/reporter')
const build = require('./src/build')

reporter(files)

process.on('unhandledRejection', function(reason, p) {
  console.log('Unhandled Promise: ', p, ' reason: ', reason)
  build.error()
})
