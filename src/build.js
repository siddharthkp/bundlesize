const Build = require('github-build')
const env = require('./environment')
const { repo, sha, token, event_type } = require('./environment')

let pass = () => {} // noop
let fail = () => process.exit(3)
let error = () => process.exit(1)

const label = 'bundlesize'
const description = 'Checking output size…'
const meta = {
  token: env.token,
  repo: env.repo,
  sha: env.sha,
  description,
  label
}

const build = new Build(meta)

if (env.token && env.event_type === 'pull_request') {
  build.start()
  pass = message => build.pass(message)
  fail = message => build.fail(message)
  error = message => build.error(message)
}

module.exports = { pass, fail, error }
