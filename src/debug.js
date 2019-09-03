const { warn } = require('prettycli')

let debugMode = false
if (process.argv.includes('--debug')) debugMode = true

const debug = (label, data) => {
  if (debugMode) warn(`${label}: ${JSON.stringify(data, null, 2)}`)
}

module.exports = debug
