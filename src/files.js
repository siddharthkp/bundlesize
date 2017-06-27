const config = require('./config')
const glob = require('glob')

const files = []

config.map(file => {
  const paths = glob.sync(file.path)
  paths.map(path => files.push({ threshold: file.threshold, path }))
})

module.exports = files
