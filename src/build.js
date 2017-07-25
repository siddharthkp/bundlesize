const Build = require('github-build')
const prettycli = require('prettycli')
const { repo, sha } = require('ci-env')
const token = require('./token')
const debug = require('./debug')

let pass = () => {} // noop
let fail = () => process.exit(1)
let error = () => process.exit(1)

const label = 'bundlesize'
const description = 'Checking output size...'
const meta = { repo, sha, token, label, description }

const build = new Build(meta)

debug('token exists', !!token)
debug('repo', repo)
debug('sha', sha)

if (token) {
  build
    .start()
    .then(() => {
      pass = (message, url) => build.pass(message, url)
      fail = (message, url) => build.fail(message, url)
      error = (message, url) => build.error(message, url)
    })
    .catch(error => {
      const message = `Could not add github status.
        ${error.status}: ${error.error.message}`

      prettycli.error(message, { silent: true, label: 'ERROR' })
    })
}

module.exports = { pass, fail, error }
