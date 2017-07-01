const Build = require('github-build')
const { repo, sha, token, event_type } = require('./environment')

let pass = () => {} // noop
let fail = () => process.exit(1)
let error = () => process.exit(1)

const label = 'bundlesize'
const description = 'Checking output size...'
const meta = { repo, sha, token, label, description }

const build = new Build(meta)

if (token && event_type === 'pull_request') {
  build.start()
  pass = message => build.pass(message)
  fail = message => build.fail(message)
  error = message => build.error(message)
}

module.exports = { pass, fail, error }
