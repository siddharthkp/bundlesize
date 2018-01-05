const readPkgUp = require('read-pkg-up')

const pkg = readPkgUp.sync().pkg
const program = require('commander')
const { error } = require('prettycli')
const debug = require('./debug')

/* Config from package.json */
const packageJSONconfig = pkg.bundlesize

/* Config from CLI */

program
  .option('-f, --files [files]', 'files to test against (dist/*.js)')
  .option(
    '-g, --gzip [gzip]',
    'compress bundle with gzip before testing (true)'
  )
  .option('-s, --max-size [maxSize]', 'maximum size threshold (3Kb)')
  .option('--debug', 'run in debug mode')
  .parse(process.argv)

let cliConfig

if (program.files) {
  cliConfig = [
    {
      path: program.files,
      maxSize: program.maxSize,
      gzip: program.gzip === undefined || program.gzip.toLowerCase() === 'true'
    }
  ]
}

/* Send to readme if no configuration is provided */

if (!packageJSONconfig && !cliConfig) {
  error(
    `Config not found.

    You can read about the configuration options here:
    https://github.com/siddharthkp/bundlesize#configuration
  `,
    { silent: true }
  )
}

const config = cliConfig || packageJSONconfig
const defaultedConfig = config.map(fileConfig =>
  Object.assign({ gzip: true }, fileConfig)
)

debug('cli config', cliConfig)
debug('package json config', packageJSONconfig)
debug('selected config', config)

module.exports = defaultedConfig
