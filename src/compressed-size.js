const gzip = require('gzip-size')

const getCompressedSize = (data, compression = 'gzip') => {
  let size
  switch (compression) {
    case 'gzip':
      size = gzip.sync(data)
      break
    case 'brotli':
      try {
        const brotli = require('brotli-size')
        size = brotli.sync(data)
      } catch (e) {
        console.warn('Missing optional dependency: brotli-size')
      }
      break
    case 'none':
    default:
      size = Buffer.byteLength(data)
  }

  return size
}

module.exports = getCompressedSize
