#!/usr/bin/env node

const files = require('./src/files')
const reporter = require('./src/reporter')
const build = require('./src/build')
const packageJsonConfig = require('./src/config');
const { error } = require('prettycli')
const program = require('commander')

const currentVersion = require('./package.json').version
const DEFAULT_SIZE = '3 kb';

program
  .version(currentVersion)
  .option('-f, --files [files]', 'Files to test against e.g. dist/*.js (String)')
  .option('-s, --max-size [maxSize]', 'Maximum size threshold e.g. 3Kb (String)', '3 kb')
  .parse(process.argv);


let cliConfig;

if (program.files && program.maxSize) {
  cliConfig = [{
    path: program.files,
    maxSize: program.maxSize
  }]
}

if (!packageJsonConfig && !cliConfig) error('Config not found', { silent: true })

const results = files(packageJsonConfig || cliConfig);

reporter(results)

process.on('unhandledRejection', function(reason, p) {
  console.log('Unhandled Promise: ', p, ' reason: ', reason)
  build.error()
})
