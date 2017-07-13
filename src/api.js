const axios = require('axios')
const { repo, sha } = require('ci-env')
const token = require('./token')
const debug = require('./debug')

const url = 'https://bundlesize-store.now.sh/values'

let enabled = false

if (repo && token) enabled = true

debug('api enabled', enabled)

const get = () => {
  debug('fetching values', '...')

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
    debug('saving values')

    axios
      .post(url, { repo, token, sha, values })
      .catch(error => console.log(error))
  }
}

const api = { enabled, set, get }
module.exports = api
