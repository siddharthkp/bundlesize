const axios = require('axios')
const qs = require('querystring')

const shorten = longUrl =>
  axios({
    method: 'POST',
    url: 'https://tinyurl.com/api-create.php',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({ url: longUrl })
  })

const shortener = { shorten }

module.exports = shortener
