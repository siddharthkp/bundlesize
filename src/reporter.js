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
  if (fail) build.fail(globalMessage || 'bundle size > maxSize', url)
  else {
    if (currentEvent === 'push' && currentBranch === 'master') {
      const values = []
      files.map(file => values.push({ path: file.path, size: file.size }))
      api.set(values)
    }
    build.pass(globalMessage || 'Good job! bundle size < maxSize', url)
  }

  debug('global message', globalMessage)
}

// Generate global message as per https://github.com/siddharthkp/bundlesize/issues/182#issuecomment-343274689
const getGlobalMessage = ({
  results,
  totalSize,
  totalSizeMaster,
  totalMaxSize
}) => {
  let globalMessage

  let failures = results.filter(result => !!result.fail).length

  if (results.length === 1) {
    const { message } = results[0]
    globalMessage = message
  } else if (failures === 1) {
    // multiple files, one failure
    const result = results.find(message => message.fail)
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

    globalMessage = `Total bundle size is ${prettySize}/${prettyMaxSize} (${prettyChange})`
  }
  return globalMessage
}

const analyse = ({ files, masterValues }) => {
  return files.map(file => {
    let fail = false
    file.master = masterValues[file.path]
    const { path, size, master, maxSize, compression = 'gzip' } = file

    let compressionText = '(no compression)'
    if (compression && compression !== 'none') {
      compressionText = `(${compression})`
    }

    let message = `${path}: ${bytes(size)} `
    if (maxSize === Infinity) {
      message += compressionText
    }
    const prettySize = bytes(maxSize)

    /*
      if size > maxSize, fail
      else if size > master, warn + pass
      else yay + pass
    */

    if (size > maxSize) {
      fail = true
      if (prettySize) message += `> maxSize ${prettySize} ${compressionText}`
      error(message, { fail: false, label: 'FAIL' })
    } else if (!master) {
      if (prettySize) message += `< maxSize ${prettySize} ${compressionText}`
      info('PASS', message)
    } else {
      if (prettySize) message += `< maxSize ${prettySize} ${compressionText}`
      const diff = size - master

      if (diff < 0) {
        message += `(${bytes(Math.abs(diff))} smaller than master, good job!)`
        info('PASS', message)
      } else if (diff > 0) {
        message += `(${bytes(diff)} larger than master, careful!)`
        warn(message)
      } else {
        message += '(same as master)'
        info('PASS', message)
      }
    }
    debug('message', message)
    return {
      message,
      fail,
      size,
      master,
      maxSize
    }
  })
}

const report = ({ files, globalMessage, fail }) => {
  /* prepare the build page */
  const params = encodeURIComponent(
    JSON.stringify({ files, repo, branch, commit_message, sha })
  )
  let url = `https://bundlesize-store.now.sh/build?info=${params}`

  debug('url before shortening', url)

  shortener
    .shorten(url)
    .then(res => {
      url = res.data.id
      debug('url after shortening', url)
      setBuildStatus({ url, files, globalMessage, fail, event, branch })
    })
    .catch(err => {
      debug('err while shortening', err)
      setBuildStatus({ url, files, globalMessage, fail, event, branch })
    })
}

const compare = (files, masterValues = {}) => {
  let results = analyse({ files, masterValues })

  let globalMessage = getGlobalMessage({
    results,
    totalSize: results.reduce((acc, result) => acc + result.size, 0),
    totalSizeMaster: results.reduce((acc, result) => acc + result.master, 0),
    totalMaxSize: results.reduce((acc, result) => acc + result.maxSize, 0)
  })

  let fail = results.filter(result => result.fail).length > 0
  report({ files, globalMessage, fail })
}

const reporter = files => {
  if (api.enabled) api.get().then(masterValues => compare(files, masterValues))
  else compare(files)
}

module.exports = reporter
