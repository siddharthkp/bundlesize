if (process.env.dev) {
  require('dotenv').config() // eslint-disable-line global-require
}

exports.config = {
  app_name: ['bundlesize store'],
  license_key: process.env.newrelicKey,
  logging: { level: 'info' }
}
