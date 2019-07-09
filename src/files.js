const fs = require('fs')
const bytes = require('bytes')
const glob = require('glob')
const { error } = require('prettycli')
const config = require('./config')
const debug = require('./debug')
const compressedSize = require('./compressed-size')

config.files.map(row => {
  row.filesMatched = []

  const files = glob.sync(row.path)

  files.map(path => {
    const compression = row.compression || 'gzip'
    const size = compressedSize(fs.readFileSync(path, 'utf8'), compression)
    row.filesMatched.push({ path, size })
  })

  if (!row.filesMatched.length) {
    error(`There is no matching file for ${row.path} in ${process.cwd()}`, {
      silent: true
    })
  }
})

debug('files', config)

module.exports = config
