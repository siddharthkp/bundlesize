const axios = require('axios')
const { repo, sha } = require('ci-env')

const token = process.env.github_token || process.env.GITHUB_TOKEN
const url = 'https://bundlesize-store.now.sh/values'

let enabled = false

if (repo && token) enabled = true

const get = () => {
  return axios
    .get(`${url}?repo=${repo}&token=${token}`)
    .then(response => {
      const values = {}
      if (response && response.data && response.data.length) {
        response.data.map(file => (values[file.path] = file.size))
      }
      return values
    })
    .catch(error => console.log(error))
}

const set = values => {
  if (repo && token) {
    axios
      .post(url, { repo, token, sha, values })
      .catch(error => console.log(error))
  }
}

const api = { enabled, set, get }
module.exports = api
