const readPkgUp = require('read-pkg-up')
const { error } = require('prettycli')

const pkg = readPkgUp.sync().pkg

if (!pkg.bundlesize) error('Config not found', { silent: true })
const config = pkg.bundlesize

module.exports = config
