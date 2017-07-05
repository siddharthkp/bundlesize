const { basename } = require('path')
const bytes = require('bytes')
const { error, warn, info } = require('prettycli')
const build = require('./build')
const api = require('./api')
const { event_type, branch } = require('./environment')

const compare = (files, masterValues = {}) => {
  let fail = false
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
      file.failed = true
      message += `> maxSize ${bytes(maxSize)} gzip`
      file.message = message
      error(message, { fail: false, label: 'FAIL' })
    } else if (!master) {
      message += `< maxSize ${bytes(maxSize)} gzip`
      file.message = message
      info('PASS', message)
    } else {
      message += `< maxSize ${bytes(maxSize)} gzip `
      const diff = size - master

      if (diff < 0) {
        file.smaller = true
        message += `(${bytes(Math.abs(diff))} smaller than master, good job!)`
        info('PASS', message)
      } else if (diff > 0) {
        file.larger = true
        message += `(${bytes(diff)} larger than master, careful!)`
        warn(message)
      } else {
        file.unchanged = true
        message += `(same as master)`
        info('PASS', message)
      }
      file.message = message
    }

    messages.push(message)
  })

  const failedMessages = (
    files.filter(file => !!file.failed)
         .map(file => file.message)
  )

  const smallerMessages = (
    files.filter(file => !!file.smaller)
         .map(file => file.message)
  )

  const largerMessages = (
    files.filter(file => !!file.larger)
         .map(file => file.message)
  )

  const unchangedMessages = (
    files.filter(file => !!file.unchanged)
         .map(file => file.message)
  )

  if (fail) build.fail(failedMessages[0] || 'bundle size > maxSize')
  else {
    if (event_type === 'push' && branch === 'master') {
      const values = []
      files.map(file => values.push({ path: file.path, size: file.size }))
      api.set(values)
    }
    let summary = ''
    let separator = ''
    if (smallerMessages.length > 0) {
      summary += `${separator}${smallerMessages.length} decreased`;
      separator = ', '
    }
    if (largerMessages.length > 0) {
      summary += `${separator}${largerMessages.length} increased`;
      separator = ', '
    }
    if (unchangedMessages.length > 0) {
      summary += `${separator}${unchangedMessages.length} unchanged`;
      separator = ', '
    }
    build.pass(summary || 'Good job! bundle size < maxSize')
  }
}

const reporter = files => {
  if (api.enabled) api.get().then(masterValues => compare(files, masterValues))
  else compare(files)
}

module.exports = reporter
