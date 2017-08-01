const axios = require('axios');

const googleApiKey = ''
const url = 'https://www.googleapis.com/urlshortener/v1/url'

const shorten = (longUrl) => {
  return axios({
    method: 'POST',
    url: `${url}?key=${googleApiKey}`,
    data: {
      longUrl
    }
  })
}

const shortener = { shorten }

module.exports = shortener;