const axios = require('axios')
const url = 'https://bundlesize-store-iothfynuyu.now.sh/values'
const { repo, token, sha } = require('./environment')

let enabled = false

if (repo && token) enabled = true

const get = () => {
  return axios
    .get(`${url}?repo=${repo}&token=${token}`)
    .then(response => {
      const values = {}
      response.data.map(file => (values[file.path] = file.size))
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
