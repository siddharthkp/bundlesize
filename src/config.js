const path = require('path')
const fs = require('fs')
const readPkgUp = require('read-pkg-up')
const program = require('commander')
const { error } = require('prettycli')
const yaml = require('js-yaml')
const pkgDir = require('pkg-dir')
const debug = require('./debug')

const pkg = readPkgUp.sync().pkg

/* Config from package.json */
const packageJSONconfig = pkg.bundlesize

/* Config from CLI */

program
  .option('-f, --files [files]', 'files to test against (dist/*.js)')
  .option('-s, --max-size [maxSize]', 'maximum size threshold (3Kb)')
  .option('--debug', 'run in debug mode')
  .parse(process.argv)

let cliConfig

if (program.files) {
  cliConfig = [
    {
      path: program.files,
      maxSize: program.maxSize
    }
  ]
}

/* Config from .bundlesize.yml */

let ymlConfig
const root = pkgDir.sync()
const ymlPath = path.resolve(root, '.bundlesize.yml')
const ymlConfigExists = fs.existsSync(ymlPath)

if (ymlConfigExists) {
  try {
    ymlConfig = yaml.safeLoad(fs.readFileSync(ymlPath))
  } catch ({ message }) {
    error(message, { silent: true })
  }
}

/* Send to readme if no configuration is provided */

if (!packageJSONconfig && !cliConfig && !ymlConfig) {
  error(
    `Config not found.

    You can read about the configuration options here:
    https://github.com/siddharthkp/bundlesize#configuration
  `,
    { silent: true }
  )
}

const config = cliConfig || packageJSONconfig || ymlConfig

debug('cli config', cliConfig)
debug('package json config', packageJSONconfig)
debug('yml config', ymlConfig)
debug('selected config', config)

module.exports = config
