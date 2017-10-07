const readPkgUp = require('read-pkg-up')

const pkg = readPkgUp.sync().pkg
const program = require('commander')
const { error } = require('prettycli')
const debug = require('./debug')

/* Config from package.json */
const packageJSONconfig = pkg.bundlesize

/* Config from CLI */

program
  .option('-c, --check', 'do a simple check for the size of the file(s)')
  .option('-f, --files [files]', 'files to test against (dist/*.js)')
  .option('-s, --max-size [maxSize]', 'maximum size threshold (3Kb)')
  .option('--debug', 'run in debug mode')
  .parse(process.argv)

let cliConfig

if (program.files) {
  cliConfig = [
    {
      path: program.files,
      maxSize: program.maxSize,
      check: program.check || !program.maxSize
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

debug('cli config', cliConfig)
debug('package json config', packageJSONconfig)
debug('selected config', config)

module.exports = config
