const axios = require('axios')

if (process.env.dev) {
  require('dotenv').config() // eslint-disable-line global-require
}

const token = code =>
  axios({
    method: 'POST',
    url: 'https://github.com/login/oauth/access_token',
    'Content-type': 'application/x-www-form-urlencoded',
    data: {
      code,
      client_id: process.env.githubId,
      client_secret: process.env.githubSecret
    }
  })
    .then(response => response.data)
    .catch(response => response.response.status)

module.exports = { token }
