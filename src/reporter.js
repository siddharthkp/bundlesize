const bytes = require('bytes')
const { error, warn, info } = require('prettycli')
const { event, repo, branch, commit_message, sha } = require('ci-env')
const build = require('./build')
const api = require('./api')
const debug = require('./debug')
const shortener = require('./shortener')

const setBuildStatus = ({
  url,
  files,
  globalMessage,
  fail,
  event: currentEvent,
  branch: currentBranch
}) => {
  if (fail) build.fail(globalMessage, url)
  else {
    if (currentEvent === 'push' && currentBranch === 'master') {
      const values = []
      files.map(file => values.push({ path: file.path, size: file.size }))
      api.set(values)
    }
    build.pass(globalMessage, url)
  }
}

const compare = (files, masterValues = {}) => {
  let failures = 0
  let totalSize = 0
  let totalSizeMaster = 0
  let totalMaxSize = 0

  const results = files.map(file => {
    const { path, size, maxSize } = file
    const master = masterValues[path] || size

    const fail = size > maxSize
    const change = size - master

    totalSize += size
    totalSizeMaster += master
    totalMaxSize += maxSize

    let message
    const prettySize = bytes(size)
    const prettyMaxSize = bytes(maxSize)
    const prettyChange =
      change === 0
        ? 'no change'
        : change > 0 ? `+${bytes(change)}` : `-${bytes(Math.abs(change))}`

    if (fail) {
      failures++
      message = `${path} is too big: ${prettySize}/${prettyMaxSize} gzip (${prettyChange})`
      error(message, { fail: false, label: 'FAIL' })
    } else {
      message = `${path} is: ${prettySize}/${prettyMaxSize} gzip (${prettyChange})`
      change > 0
        ? warn(message, { fail: false, label: 'PASS' })
        : info('PASS', message)
    }

    return {
      ...file,
      fail,
      change,
      message,
      master
    }
  })

  let globalMessage

  if (results.length === 1) {
    const { message } = results[0]
    globalMessage = message
  } else {
    if (failures === 1) {
      // multiple files, one failure
      const result = results.find(result => result.fail)
      const { message } = result

      globalMessage = message
    } else if (failures) {
      // multiple files, multiple failures
      const change = totalSize - totalSizeMaster
      const prettyChange =
        change === 0
          ? 'no change'
          : change > 0 ? `+${bytes(change)}` : `-${bytes(Math.abs(change))}`

      globalMessage = `${failures} out of ${results.length} bundles are too big! (${prettyChange})`
    } else {
      // multiple files, no failures
      const prettySize = bytes(totalSize)
      const prettyMaxSize = bytes(totalMaxSize)
      const change = totalSize - totalSizeMaster
      const prettyChange =
        change === 0
          ? 'no change'
          : change > 0 ? `+${bytes(change)}` : `-${bytes(Math.abs(change))}`

      globalMessage = `Total bundle size is ${prettySize}/${prettyMaxSize} gzip (${prettyChange})`
    }
  }

  debug('globalMessage', globalMessage)

  /* prepare the build page */
  const params = encodeURIComponent(
    JSON.stringify({ files: results, repo, branch, commit_message, sha })
  )
  let url = `https://bundlesize-store.now.sh/build?info=${params}`

  debug('url before shortening', url)

  return shortener
    .shorten(url)
    .then(res => {
      url = res.data.id
      debug('url after shortening', url)
      setBuildStatus({
        url,
        files: results,
        globalMessage,
        fail: !!failures,
        event,
        branch
      })
    })
    .catch(err => {
      debug('err while shortening', err)
      setBuildStatus({
        url,
        files: results,
        globalMessage,
        fail: !!failures,
        event,
        branch
      })
    })
}

const reporter = files => {
  return api.enabled
    ? api.get().then(masterValues => compare(files, masterValues))
    : compare(files)
}

module.exports = reporter
