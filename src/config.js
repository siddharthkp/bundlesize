const readPkgUp = require('read-pkg-up')
const pkg = readPkgUp.sync().pkg
const config = pkg.bundlesize

module.exports = config
