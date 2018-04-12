const readPkgUp = require('read-pkg-up')
const fs = require('fs')

const pkg = readPkgUp.sync().pkg
const program = require('commander')
const { error } = require('prettycli')
const debug = require('./debug')

/* Config from CLI */
program
  .option('-f, --files [files]', 'files to test against (dist/*.js)')
  .option(
    '-n, --config [config]',
    'set external config (ex: ./.bundlesizeconfig)'
  )
  .option('-s, --max-size [maxSize]', 'maximum size threshold (3Kb)')
  .option('--debug', 'run in debug mode')
  .option(
    '-c, --compression [compression]',
    'specify which compression algorithm to use'
  )
  .parse(process.argv)

let cliConfig

if (program.files) {
  cliConfig = [
    {
      config: program.config,
      path: program.files,
      maxSize: program.maxSize,
      compression: program.compression || 'gzip'
    }
  ]
}

/* Config from package.json or config */
const jsonConfig =
  program.config && fs.existsSync(program.config)
    ? JSON.parse(fs.readFileSync(program.config, 'utf8')).bundlesize
    : pkg.bundlesize

/* Send to readme if no configuration is provided */
if (!jsonConfig && !cliConfig) {
  error(
    `Config not found.

    You can read about the configuration options here:
    https://github.com/siddharthkp/bundlesize#configuration
  `,
    { silent: true }
  )
}

const config = cliConfig || jsonConfig

debug('cli config', cliConfig)
debug('json config', jsonConfig)
debug('selected config', config)

module.exports = config
