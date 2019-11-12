const fs = require('fs')
const bytes = require('bytes')
const glob = require('glob')
const { error } = require('prettycli')
const config = require('./config')
const debug = require('./debug')
const compressedSize = require('./compressed-size')
const files = []

config.map(file => {
  const paths = glob.sync(file.path)
  if (!paths.length) {
    error(`There is no matching file for ${file.path} in ${process.cwd()}`, {
      silent: true
    })
  } else {
    paths.map(path => {
      const maxSize = bytes(file.maxSize) || Infinity
      const compression = file.compression || 'gzip'
      const size = compressedSize(fs.readFileSync(path, 'utf8'), compression)
      files.push({ maxSize, path, size, compression })
    })
  }
})

debug('files', files)

module.exports = files
