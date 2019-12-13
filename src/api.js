const axios = require('axios')
let { repo } = require('ci-env')
const { sha, ci } = require('ci-env')
const { warn } = require('prettycli')

const token = require('./token')
const debug = require('./debug')

const url = 'https://bundlesize-store.now.sh/values'

let enabled = false

if (repo && token) enabled = true
else if (ci) {
  // skip this for a while
  // TODO: maybe bring it back!
  // warn(`github token not found
  //
  //   You are missing out on some cool features.
  //   Read more here: https://github.com/siddharthkp/bundlesize#build-status-for-github
  // `)
}

debug('api enabled', enabled)

const get = () => {
  debug('fetching values', '...')

  repo = repo.replace(/\./g, '_')
  return axios
    .get(`${url}?repo=${repo}&token=${token}`)
    .then(response => {
      const values = {}
      if (response && response.data && response.data.length) {
        response.data.map(file => (values[file.path] = file.size))
      }
      debug('master values', values)
      return values
    })
    .catch(error => {
      debug('fetching failed', error.response.data)
      console.log(error)
    })
}

const set = values => {
  if (repo && token) {
    repo = repo.replace(/\./g, '_')
    debug('saving values')

    axios
      .post(url, { repo, token, sha, values })
      .catch(error => console.log(error))
  }
}

const api = { enabled, set, get }
module.exports = api
