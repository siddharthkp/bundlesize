const Build = require('github-build')
const { repo, sha, token, event_type } = require('./travis')

const pass = () => {} // noop
const fail = () => process.exit(1)
const error = () => process.exit(1)

const label = 'perfbench'
const description = 'Running performance tests...'
const meta = { repo, sha, token, label, description }

const build = new Build(meta)

if (token && event_type === 'pull_request') {
  build.start()
  pass = message => build.pass(message)
  fail = message => build.fail(message)
  error = message => build.error(message)
}

module.exports = { pass, fail, error }
