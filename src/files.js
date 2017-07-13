const fs = require('fs')
const bytes = require('bytes')
const glob = require('glob')
const gzip = require('gzip-size')

function files(config) {
  const filesResults = []

  config.map(file => {
    const paths = glob.sync(file.path)
    paths.map(path => {
      const size = gzip.sync(fs.readFileSync(path, 'utf8'))
      const maxSize = bytes(file.threshold || file.maxSize)
      filesResults.push({ maxSize, path, size })
    })
  })

  return filesResults;
}

module.exports = files
