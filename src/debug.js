let debugMode = false

if ([process.argv].indexOf('--debug') === -1) debugMode = true

const debug = (label, info) => {
  if (debugMode) console.log(label, ':', info, '\n')
}

module.exports = debug
