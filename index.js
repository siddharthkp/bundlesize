#!/usr/bin/env node

const { inspect } = require('util')
const { files, enabledOpenMode } = require('./src/files')
const reporter = require('./src/reporter')
const build = require('./src/build')

reporter(files, enabledOpenMode)

process.on('unhandledRejection', function(reason) {
  console.log('Unhandled Promise')
  console.log(inspect(reason))
  build.error()
})
