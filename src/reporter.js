const bytes = require('bytes')
const { error, warn, info } = require('prettycli')
const build = require('./build')
const api = require('./api')
const { event_type, branch } = require('./environment')

const compare = (files, masterValues = {}) => {
  let fail = false
  let globalMessage

  files.map(file => (file.master = masterValues[file.path]))

  files.map(file => {
    const { path, size, master, threshold } = file

    let message = `${path}: ${bytes(size)} `

    /*
      if size > threshold, fail
      else if size > master, warn + pass
      else yay + pass
    */

    if (size > threshold) {
      fail = true
      message += `> threshold ${bytes(threshold)} gzip`
      error(message, { fail: false, label: 'FAIL' })
    } else if (!master) {
      message += `< threshold ${bytes(threshold)} gzip`
      info('PASS', message)
    } else {
      message += `< threshold ${bytes(threshold)} gzip `
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

      if (files.length === 1) globalMessage = message
    }
  })

  if (fail) build.fail(globalMessage || 'bundle size > threshold')
  else {
    if (event_type === 'push' && branch === 'master') {
      const values = []
      files.map(file => values.push({ path: file.path, size: file.size }))
      api.set(values)
    }
    build.pass(globalMessage || 'Good job! bundle size < threshold')
  }
}

const reporter = files => {
  if (api.enabled) {
    api.get().then(masterValues => compare(files, masterValues))
  } else {
    compare(files)
  }
}

module.exports = reporter
