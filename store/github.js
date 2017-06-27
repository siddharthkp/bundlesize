const axios = require('axios')

if (process.env.dev) {
  require('dotenv').config()
}

const token = code => {
  return axios({
    method: 'POST',
    url: 'https://github.com/login/oauth/access_token',
    'Content-type': 'application/x-www-form-urlencoded',
    data: {
      code: code,
      client_id: process.env.client_id,
      client_secret: process.env.client_secret
    }
  })
    .then(response => response.data)
    .catch(response => response.response.status)
}

module.exports = { token }
