#!/usr/bin/env node
'use strict'

const readPkgUp = require('read-pkg-up')
const prettycli = require('prettycli')
const yargs = require('yargs')
const chalk = require('chalk')
const bytes = require('bytes')
const path = require('path')
const fs = require('fs')

const isFirstJob = require('./src/is-first-job')
const getSizes = require('.')
const build = require('./src/build')
const env = require('./src/environment')
const api = require('./src/api')

process.on('unhandledRejection', function(reason, p) {
  console.log('Unhandled Promise: ', p, ' reason: ', reason)
  build.error()
})

const argv = yargs
  .usage('$0 [FILES]')
  .option('why', {
    alias: 'w',
    describe: 'Show package content',
    type: 'boolean'
  })
  .option('babili', {
    describe: 'Babili minifier for ES2016+ projects',
    type: 'boolean'
  })
  .version()
  .help()
  .alias('help', 'h')
  .alias('version', 'v')
  .epilog('Examples:\n' +
          '  Check current project size:\n' +
          '    $0\n' +
          '  See specific files size:\n' +
          '    $0 ./index.js ./extra.js\n' +
          '  Show package content in browser:\n' +
          '    $0 --why')
  .locale('en')
  .argv

if (!isFirstJob()) {
  process.stdout.write(
    chalk.yellow('Size Limits run only on first CI job, to save CI resources'))
  process.stdout.write('\n')
  process.exit(0)
}

function calc (files, base) {
  files = files.map(i => {
    if (path.isAbsolute(i)) {
      return i
    } else {
      return path.join(base, i)
    }
  })
  const opts = { minifier: argv.babili ? 'babili' : 'uglifyjs' }
  if (argv.why && process.env['NODE_ENV'] === 'test') {
    opts.analyzer = 'static'
  } else if (argv.why) {
    opts.analyzer = 'server'
  }
  return getSizes(files, opts).then(results => {
    return results.map(i => {
      return { path: path.relative(base, i.path), size: i.size }
    })
  })
}

function formatBytes (size) {
  const format = bytes
    .format(size, { unitSeparator: ' ' })
    .replace('k', 'K')
  return chalk.bold(format)
}

function errorHandler (e) {
  if (/module not found:/i.test(e.message)) {
    const first = e.message.match(/module not found:[^\n]*/i)[0]
    const filtered = first.replace(/module not found: Error: /i, '')
    prettycli.error(filtered, { silent: true })
  } else {
    prettycli.error(e.stack, { silent: true })
  }
  process.exit(1)
}

if (argv['_'].length > 0) {
  calc(argv['_'], process.cwd()).then(results => {
    for (const i of results) {
      prettycli.info('INFO', `${i.path}: ${formatBytes(i.size)}`)
    }
  }).catch(errorHandler)

} else {
  const compare = masters => {
    return readPkgUp().then(result => {
      if (!result.pkg || !result.pkg.bundlesize) {
        prettycli.error('Config not found', { silent: true })
        process.exit(1)
      }

      const config = result.pkg.bundlesize
      const files = config.map(i => i.path)
      return calc(files, path.dirname(result.path)).then(results => {
        return results.map((result, index) => {
          result.threshold = bytes.parse(config[index].threshold)
          return result
        })
      })
    }).then(results => {
      let fail = false
      let total

      for (const i of results) {
        const master = masters[i.path]
        let message = `${i.path}: ${formatBytes(i.size)} `

        if (i.size > i.threshold) {
          fail = true
          message += `> threshold ${formatBytes(i.threshold)} gzip`
          prettycli.error(message, { fail: false, label: 'FAIL' })
        } else if (!master) {
          message += `< threshold ${formatBytes(i.threshold)} gzip`
          prettycli.info('PASS', message)
        } else {
          message += `< threshold ${formatBytes(i.threshold)} gzip `
          const diff = size - master

          if (diff < 0) {
            message += `(${formatBytes(Math.abs(diff))} smaller than master, good job!)`
            prettycli.info('PASS', message)
          } else if (diff > 0) {
            message += `(${formatBytes(diff)} larger than master, careful!)`
            prettycli.warn(message)
          } else {
            message += `(same as master)`
            prettycli.info('PASS', message)
          }
        }

        if (results.length === 1) total = message

        if (fail) {
          build.fail(total || 'bundle size > threshold')
        } else {
          if (env.event_type === 'push' && env.branch === 'master') {
            api.set(results.reduce(i => {
              values.push({ path: i.path, size: i.size })
            }, []))
          }
          build.pass(total || 'Good job! bundle size < threshold')
        }
      }
    })
  }

  if (api.enabled) {
    api.get().then(master => compare(master)).catch(errorHandler)
  } else {
    compare({ }).catch(errorHandler)
  }
}
