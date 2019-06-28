const cosmiconfig = require('cosmiconfig')

const program = require('commander')
const { error } = require('prettycli')
const debug = require('./debug')

/* Config from file */

let fileConfig

const explorer = cosmiconfig('bundlesize', {
  searchPlaces: ['package.json', 'bundlesize.config.json', 'config/bundlesize.config.json']
})

const result = explorer.searchSync()

if (result) {
  if (result.filepath.includes('package.json')) fileConfig = result.config
  else fileConfig = result.config.files
}

/* Config from CLI */

program
  .option('-f, --files [files]', 'files to test against (dist/*.js)')
  .option('-s, --max-size [maxSize]', 'maximum size threshold (3Kb)')
  .option('--debug', 'run in debug mode')
  .option('-c, --compression [compression]', 'specify which compression algorithm to use')
  .parse(process.argv)

let cliConfig

if (program.files) {
  cliConfig = [
    {
      path: program.files,
      maxSize: program.maxSize,
      compression: program.compression || 'gzip'
    }
  ]
}

/* Send to readme if no configuration is provided */

if (!fileConfig && !cliConfig) {
  error(
    `Config not found.

    You can read about the configuration options here:
    https://github.com/siddharthkp/bundlesize#configuration
  `,
    { silent: true }
  )
}

const config = cliConfig || fileConfig

debug('cli config', cliConfig)
debug('file config', fileConfig)
debug('selected config', config)

module.exports = config
