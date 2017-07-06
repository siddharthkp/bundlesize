const fs = require('fs')
const bytes = require('bytes')
const glob = require('glob')
const gzip = require('gzip-size')
const { error, warn, info } = require('prettycli')

const config = require('./config')

const files = []

if (config && config.length) {
  config.map(file => {
    try {
      const paths = glob.sync(file.path)
      if (paths.length) {
        paths.map(path => {
            const size = gzip.sync(fs.readFileSync(path, 'utf8'))
            const maxSize = bytes(file.threshold || file.maxSize)
            files.push({ maxSize, path, size })
        })
      } else {
        warn('No valid path found')
      }
    } catch (e) {
      error(e, { silent: false })
    }
  })
} else {
  error('Invalid Config', { silent: false })
}

module.exports = files
