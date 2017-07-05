#!/usr/bin/env node

const { inspect } = require('util')
const files = require('./src/files')
const reporter = require('./src/reporter')
const build = require('./src/build')

reporter(files)

process.on('unhandledRejection', function(reason, p) {
  console.log('Unhandled Promise: ')
  console.log(inspect(p))
  console.log(inspect(reason))
  build.error()
})
