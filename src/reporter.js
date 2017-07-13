const bytes = require('bytes')
const { error, warn, info } = require('prettycli')
const { event, branch } = require('ci-env')
const build = require('./build')
const api = require('./api')
const debug = require('./debug')

const compare = (files, masterValues = {}) => {
  let fail = false
  let globalMessage

  files.map(file => (file.master = masterValues[file.path]))

  files.map(file => {
    const { path, size, master, maxSize } = file

    let message = `${path}: ${bytes(size)} `

    /*
      if size > maxSize, fail
      else if size > master, warn + pass
      else yay + pass
    */

    if (size > maxSize) {
      fail = true
      message += `> maxSize ${bytes(maxSize)} gzip`
      error(message, { fail: false, label: 'FAIL' })
    } else if (!master) {
      message += `< maxSize ${bytes(maxSize)} gzip`
      info('PASS', message)
    } else {
      message += `< maxSize ${bytes(maxSize)} gzip `
      const diff = size - master

      if (diff < 0) {
        message += `(${bytes(Math.abs(diff))} smaller than master, good job!)`
        info('PASS', message)
      } else if (diff > 0) {
        message += `(${bytes(diff)} larger than master, careful!)`
        warn(message)
      } else {
        message += `(same as master)`
        info('PASS', message)
      }
    }

    if (files.length === 1) globalMessage = message
    debug('message', message)
  })

  if (fail) build.fail(globalMessage || 'bundle size > maxSize')
  else {
    if (event === 'push' && branch === 'master') {
      const values = []
      files.map(file => values.push({ path: file.path, size: file.size }))
      api.set(values)
    }
    build.pass(globalMessage || 'Good job! bundle size < maxSize')
  }

  debug('global message', globalMessage)
}

const reporter = files => {
  if (api.enabled) api.get().then(masterValues => compare(files, masterValues))
  else compare(files)
}

module.exports = reporter
