const fs = require('fs')
const bytes = require('bytes')
const glob = require('glob')
const gzip = require('gzip-size')
const { error } = require('prettycli')
const config = require('./config')

const files = []

config.map(file => {
  const paths = glob.sync(file.path)
  if (!paths.length) {
    error('There is no matching file for ' + file.path, { silent: true })
  } else {
    paths.map(path => {
      const size = gzip.sync(fs.readFileSync(path, 'utf8'))
      const maxSize = bytes(file.threshold || file.maxSize)
      files.push({ maxSize, path, size })
    })
  }
})

module.exports = files
