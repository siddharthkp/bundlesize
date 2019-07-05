#!/usr/bin/env node

const { inspect } = require('util')
const config = require('./src/files')
const analyse = require('./src/analyse')
const cli = require('./src/reporters/cli')
const reporter = require('./src/reporter')
const build = require('./src/build')

const results = analyse(config)

// reporter(report.files)

cli.report(results)

// exit with error code 1 if there are any failed checks
if (results.status === 'fail') process.exit(1)

process.on('unhandledRejection', function(reason) {
  console.log('Unhandled Promise')
  console.log(inspect(reason))
  build.error()
})

/*
  This is the ideal structure to get to:

  - utilities function
  - pipe results down

  start()
    .then(getConfig)
    .then(attachFiles)
    .then(attachSize)
    .then(attachComparison)
    .then(reportOnCli)
    .then(reportOnBuild)
*/
