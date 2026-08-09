const fs = require('fs')
const path = require('path')
const bytes = require('bytes')
const glob = require('glob')
const { error } = require('prettycli')
const config = require('./config')
const debug = require('./debug')
const compressedSize = require('./compressed-size')
const minimatch = require("minimatch")
const files = []

config.map(file => {
  let paths = [];
  if (file.assetManifest) {
    const buildPath = path.dirname(file.assetManifest);
    const rawData = fs.readFileSync(file.assetManifest, 'utf8');
    const assets = JSON.parse(rawData);
    paths = Object.values(assets).map(asset => `${buildPath}${asset}`)
      .filter(filename => !file.path || minimatch(filename, file.path));
  } else {
    paths = glob.sync(file.path)
  }
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
