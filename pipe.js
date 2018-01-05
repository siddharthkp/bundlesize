#!/usr/bin/env node
const { inspect } = require('util')
const program = require('commander')
const reporter = require('./src/reporter')
const gzip = require('gzip-size')
const bytes = require('bytes')
const readStream = require('./src/readStream')
const { error } = require('prettycli')
const build = require('./src/build')
const debug = require('./src/debug')

const getSize = (data, gzipEnabled) => {
  if (gzipEnabled) {
    return gzip.sync(data)
  } else {
    return Buffer.byteLength(data)
  }
}

if (process.stdin.isTTY) {
  error('bundlesize-pipe executable is meant for usage with piped data.')
}

program
  .option(
    '-g, --gzip [gzip]',
    'compress bundle with gzip before testing (true)'
  )
  .option('-n, --name [name]', 'custom name for a file (lib.min.js)')
  .option('-s, --max-size [maxSize]', 'maximum size threshold (3Kb)')
  .option('--debug', 'run in debug mode')
  .parse(process.argv)

const config = {
  gzip: program.gzip === undefined || program.gzip.toLowerCase() === 'true',
  name: program.name || require('read-pkg-up').sync().pkg.name,
  maxSize: program.maxSize
}

debug('config', config)

process.stdin.setEncoding('utf8')
readStream(process.stdin).then(data => {
  const size = getSize(data, config.gzip)
  const maxSize = bytes(config.maxSize) || Infinity
  const file = {
    path: config.name,
    maxSize,
    size,
    gzip: config.gzip
  }
  debug('file', file)
  reporter([file])
})

process.on('unhandledRejection', reason => {
  console.log('Unhandled Promise')
  console.log(inspect(reason))
  build.error()
})
