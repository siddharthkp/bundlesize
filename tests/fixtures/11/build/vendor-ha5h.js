/*
The contents of this file aren't important,
what's important is the size

169B gzip

*/

const { inspect } = require('util')
const files = require('./src/files')
const reporter = require('./src/reporter')
const build = require('./src/build')

reporter(files)
