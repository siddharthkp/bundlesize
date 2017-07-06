const readPkgUp = require('read-pkg-up')
const { error, info } = require('prettycli')

const pkg = readPkgUp.sync().pkg

if (!pkg.bundlesize) {
    error('Config not found', { silent: false })
    info('Just add this to your package.json', '\n\n"bundlesize": [ { "path": "./index.js", "maxSize": "600B" } ]')
}
const config = pkg.bundlesize

module.exports = config
