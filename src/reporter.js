const bytes = require('bytes')
const { error, warn, info } = require('prettycli')
const build = require('./build')
const api = require('./api')
const { event_type, branch } = require('./travis')

const compare = (files, masterValues = {}) => {
  let fail = false

  files.map(file => (file.master = bytes(masterValues[file.path])))

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
      message += `> threshold ${bytes(threshold)}`
      error(message, { fail: false, label: 'FAIL' })
    } else if (!master) {
      message += `< threshold ${bytes(threshold)}`
      info('PASS', message)
    } else {
      message += `< threshold ${bytes(threshold)} `
      const diff = size - master

      if (diff < 0) {
        message += `(${bytes(Math.abs(diff))} smaller than master, good job!)`
        info('PASS', message)
      } else if (diff > 0) {
        message += `(${bytes(diff)} larger than master, careful!)`
        warn(message)
      } else {
        info('PASS', message)
      }
    }

    if (fail) build.fail()
    else {
      if (event_type === 'push' && branch === 'master') {
        const values = []
        files.map(file => values.push({ path: file.path, size: file.size }))
        api.set(values)
      }
      build.pass()
    }
  })
}

const reporter = files => {
  if (api.enabled) api.get().then(masterValues => compare(files, masterValues))
  else compare(files)
}

module.exports = reporter
