const axios = require('axios')

const googleApiKey = 'AIzaSyACIqikanS3eoHsy14JYyFAHU1aU5w1YoA'
const url = 'https://www.googleapis.com/urlshortener/v1/url'

const shorten = longUrl =>
  axios({
    method: 'POST',
    url: `${url}?key=${googleApiKey}`,
    data: {
      longUrl
    }
  })

const shortener = { shorten }

module.exports = shortener
