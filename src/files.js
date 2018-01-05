const fs = require('fs')
const bytes = require('bytes')
const glob = require('glob')
const gzip = require('gzip-size')
const { error } = require('prettycli')
const config = require('./config')
const debug = require('./debug')

const files = []

const getFileSize = (path, gzipEnabled) => {
  if (gzipEnabled) {
    return gzip.sync(fs.readFileSync(path, 'utf8'))
  } else {
    return fs.statSync(path).size
  }
}

const populateFileSizes = (paths, maxSize, gzipEnabled) => {
  paths.forEach(path => {
    const size = getFileSize(path, gzipEnabled)
    const maxSizeBytes = bytes(maxSize) || Infinity
    files.push({ maxSize: maxSizeBytes, path, size, gzip: gzipEnabled })
  })
}

config.map(file => {
  const paths = glob.sync(file.path)
  if (!paths.length) {
    error(`There is no matching file for ${file.path} in ${process.cwd()}`, {
      silent: true
    })
  } else {
    populateFileSizes(paths, file.maxSize, file.gzip)
  }
})

debug('files', files)

module.exports = files
