const readPkgUp = require('read-pkg-up')
const pkg = readPkgUp.sync().pkg
const program = require('commander')
const { error } = require('prettycli')

/* Config from package.json */
const packageJSONconfig = pkg.bundlesize

/* Config from CLI */

program
  .option('-f, --files [files]', 'files to test against (dist/*.js)')
  .option('-s, --max-size [maxSize]', 'maximum size threshold (3Kb)')
  .parse(process.argv)

let cliConfig

if (program.files && program.maxSize) {
  cliConfig = [
    {
      path: program.files,
      maxSize: program.maxSize
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

module.exports = config
