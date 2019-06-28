const cosmiconfig = require('cosmiconfig')
const fs = require('fs')

const program = require('commander')
const { error } = require('prettycli')
const debug = require('./debug')

// default places we check
const configPaths = ['package.json', 'bundlesize.config.json']

/* Config + Flags from CLI */
// TODO: Deprecate the config part

program
  .option('-f, --files [files]', 'files to test against (dist/*.js)')
  .option('-s, --max-size [maxSize]', 'maximum size threshold (3Kb)')
  .option('--debug', 'run in debug mode')
  .option('--config [config]', 'Get path of configuration file')
  .option(
    '-c, --compression [compression]',
    'specify which compression algorithm to use'
  )
  .parse(process.argv)

let configFromCli

if (program.config) {
  if (!fs.existsSync(program.config)) {
    // throw error if file doesn't exist
    error(
      `Custom config file does not exist. Make sure the path is relative to the project root.

      You can read about the configuration options here:
      https://github.com/siddharthkp/bundlesize#configuration
    `,
      { silent: true }
    )
  } else {
    // add to the list of files to check at the 1st position
    configPaths.unshift(program.config)
  }
}

if (program.files) {
  configFromCli = [
    {
      path: program.files,
      maxSize: program.maxSize,
      compression: program.compression || 'gzip'
    }
  ]
}

/* Config from file */

let configFromFile

const explorer = cosmiconfig('bundlesize', { searchPlaces: configPaths })
const result = explorer.searchSync()

if (result) {
  if (result.filepath.includes('package.json')) configFromFile = result.config
  else configFromFile = result.config.files
}

/* Send to readme if no configuration is provided */

if (!configFromFile && !configFromCli) {
  error(
    `Config not found.

    You can read about the configuration options here:
    https://github.com/siddharthkp/bundlesize#configuration
  `,
    { silent: true }
  )
}

const config = configFromCli || configFromFile

debug('cli config', configFromCli)
debug('file config', configFromFile)
debug('selected config', config)

module.exports = config
