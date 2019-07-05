#!/usr/bin/env node

const files = require('./src/pipeline/files')
const analyse = require('./src/pipeline/analyse')

const cli = require('./src/reporters/cli')
const github = require('./src/reporters/github')
const build = require('./src/reporters/build')

// old reporter
const reporter = require('./src/reporter')
// reporter(report.files)

try {
  const results = analyse(files)
  cli.report(results)
  build.report(results)
} catch (err) {
  build.error(err)
}

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
