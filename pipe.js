#!/usr/bin/env node
const { inspect } = require('util')
const program = require('commander')
const reporter = require('./src/reporter')
const gzip = require('gzip-size')
const brotli = require('brotli-size')
const bytes = require('bytes')
const readStream = require('./src/readStream')
const { error } = require('prettycli')
const build = require('./src/build')
const debug = require('./src/debug')

if (process.stdin.isTTY) {
  error('bundlesize-pipe executable is meant for usage with piped data.')
}

program
  .option('-n, --name [name]', 'custom name for a file (lib.min.js)')
  .option('-s, --max-size [maxSize]', 'maximum size threshold (3Kb)')
  .option(
    '-c, --compression [gzip|brotli|none]',
    'specify which compression algorithm to use'
  )
  .option('--debug', 'run in debug mode')
  .parse(process.argv)

const config = {
  name: program.name || require('read-pkg-up').sync().pkg.name,
  maxSize: program.maxSize,
  compression: program.compression || 'gzip',
}

debug('config', config)

process.stdin.setEncoding('utf8')
readStream(process.stdin).then(data => {
  let size;
  switch (config.compression) {
    case 'gzip':
      size = gzip.sync(data)
      break
    case 'brotli':
      size = brotli.sync(data)
      break
    case 'none':
    default:
      size = Buffer.byteLength(data)
  }
  const maxSize = bytes(config.maxSize) || Infinity
  const file = {
    path: config.name,
    maxSize,
    size
  }
  debug('file', file)
  reporter([file])
})

process.on('unhandledRejection', reason => {
  console.log('Unhandled Promise')
  console.log(inspect(reason))
  build.error()
})
