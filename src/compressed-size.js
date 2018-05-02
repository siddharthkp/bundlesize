const { warn } = require('prettycli')
const gzip = require('gzip-size')
let brotli

const getCompressedSize = (data, compression = 'gzip') => {
  let size
  switch (compression) {
    case 'gzip':
      size = gzip.sync(data)
      break
    case 'brotli':
      try {
        brotli = require('brotli-size')
      } catch (e) {
        warn(`Missing optional dependency. Install it with:
          npm install --save brotli-size`)
      }
      size = brotli ? brotli.sync(data) : 0
      break
    case 'none':
    default:
      size = Buffer.byteLength(data)
  }

  return size
}

module.exports = getCompressedSize
