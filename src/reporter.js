const bytes = require('bytes')
const { error, warn, info } = require('prettycli')
const { event, repo, branch, commit_message, sha } = require('ci-env')
const build = require('./build')
const api = require('./api')
const debug = require('./debug')
const shortener = require('./shortener')

const compare = (files, masterValues = {}) => {
  let fail = false
  let globalMessage

  files.map(file => (file.master = masterValues[file.path]))

  files.map(file => {
    const { path, size, master, maxSize } = file

    let message = `${path}: ${bytes(size)} `
    const prettySize = bytes(maxSize)
    /*
      if size > maxSize, fail
      else if size > master, warn + pass
      else yay + pass
    */

    if (size >maxSize) {
      fail = true
      if (prettySize) message += `> maxSize ${prettySize} gzip`
      error(message, { fail: false, label: 'FAIL' })
    } else if (!master) {
      if (prettySize) message += `< maxSize ${prettySize} gzip`
      info('PASS', message)
    } else {
      if (prettySize) message += `< maxSize ${prettySize} gzip `
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

  /* prepare the build page */
  const params = encodeURIComponent(JSON.stringify({ files, repo, branch, commit_message, sha }))
  let url = `https://bundlesize-store.now.sh/build?info=${params}`

  debug('url before shortening', url)

  shortener
    .shorten(url)
    .then(res => {
      url = res.data.id
      debug('url after shortening', url)
      setBuildStatus({ url, files, globalMessage, fail, event, branch })
    })
    .catch(error => {
      debug('error while shortening', error)
      setBuildStatus({ url, files, globalMessage, fail, event, branch })
    })
}

const setBuildStatus = ({ url, files, globalMessage, fail, event, branch }) => {
  if (fail) build.fail(globalMessage || 'bundle size > maxSize', url)
  else {
    if (event === 'push' && branch === 'master') {
      const values = []
      files.map(file => values.push({ path: file.path, size: file.size }))
      api.set(values)
    }
    build.pass(globalMessage || 'Good job! bundle size < maxSize', url)
  }

  debug('global message', globalMessage)
}

const reporter = files => {
  if (api.enabled) api.get().then(masterValues => compare(files, masterValues))
  else compare(files)
}

module.exports = reporter
