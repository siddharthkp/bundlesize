const fs = require('fs')
const readPkgUp = require('read-pkg-up')
const gzip = require('gzip-size')
const bytes = require('bytes')
const { error, info } = require('prettycli')

const getConfig = () => {
  return new Promise((resolve, reject) => {
    readPkgUp().then(result => {
      if (!result.pkg.libsize) error('Config not found', { silent: true })
      const config = result.pkg.libsize
      resolve(config)
    })
  })
}

const getSize = config => {
  return new Promise(resolve => {
    const content = fs.readFileSync(config.path, 'utf8')
    const size = gzip.sync(content)
    resolve({ size, config })
  })
}

const compare = ({ size, config }) => {
  const threshold = bytes(config.threshold)

  const prettySize = bytes(size)
  const prettyThreshold = bytes(threshold)

  if (size > threshold) {
    error(`size ${prettySize} > threshold ${prettyThreshold}`, { silent: true })
  } else {
    info('LIB', `size ${prettySize} < threshold ${prettyThreshold}`)
  }
}

getConfig().then(getSize).then(compare)
