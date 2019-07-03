const compare = require('compare-versions')
const { error } = require('prettycli')
const zlib = require('zlib')

const config = require('./config')

function getBrotliSync() {
  // Does this project want brotli compression?
  const needsBrotli = config.find(row => row.compression === 'brotli')

  // If it doesn't, save us the trouble.
  if (!needsBrotli) return null

  // Check if the installed version of node supports brotli
  const hasBrotli = zlib.brotliCompressSync
  if (hasBrotli) return nativeBrotliSync

  // Looks like this version of node does not have brotli
  // We recommend using bundlesize-plugin-brotli which acts
  // like a polyfill

  try {
    const polyfill = require('bundlesize-plugin-brotli')
    // if the user has installed the plugin, we can safely return it
    return polyfill
  } catch (err) {
    // if they haven't, show them an error and exit with error code 1
    const message = `Missing dependency: bundlesize-plugin-brotli

  To use brotli with Node versions lower than v10.16.0,
  please install bundlesize-plugin-brotli as a dev dependency.

  You can read about the compression options here:
  https://github.com/siddharthkp/bundlesize#customisation`

    error(message, { silent: true })
  }
}

function nativeBrotliSync(input) {
  return zlib.brotliCompressSync(input).length
}

module.exports = { sync: getBrotliSync() }
