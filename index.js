#!/usr/bin/env node
const getCiEnvironment = require('./src/environment');
const files = require('./src/files');
const createBuild = require('./src/build');
const parse = require('./src/parser');
const createApi = require('./src/api');
const createReporter = require('./src/reporter');
const createRunner = require('./src/runner');

const ciEnvironment = getCiEnvironment();
const build = createBuild(ciEnvironment);
const reporter = createReporter(build);
const api = createApi(ciEnvironment);
const runner = createRunner(ciEnvironment, api, reporter, parse);

runner.run(files);

process.on('unhandledRejection', function(reason, p) {
  console.log('Unhandled Promise: ', p, ' reason: ', reason);
  reporter.reportError();
});
