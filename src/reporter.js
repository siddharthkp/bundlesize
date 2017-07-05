const { basename } = require('path')
const bytes = require('bytes')
const { error, warn, info } = require('prettycli')
const build = require('./build')
const api = require('./api')
const { event_type, branch } = require('./environment')

const compare = (files, masterValues = {}) => {
  let fail = false
  let globalMessage
  let messages = []

  files.map(file => (file.master = masterValues[file.path]))

  files.map(file => {
    const { path, size, master, maxSize } = file

    let message = `${basename(path)}: ${bytes(size)} `

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

    messages.push(message)
  })

  if (messages.length === 1 || fail) {
    globalMessage = messages[0]
  } else {
    globalMessage = messages.join(', ')
  }

  if (fail) build.fail(globalMessage || 'bundle size > maxSize')
  else {
    if (event_type === 'push' && branch === 'master') {
      const values = []
      files.map(file => values.push({ path: file.path, size: file.size }))
      api.set(values)
    }
    build.pass(globalMessage || 'Good job! bundle size < maxSize')
  }
}

const reporter = files => {
  if (api.enabled) api.get().then(masterValues => compare(files, masterValues))
  else compare(files)
}

module.exports = reporter
