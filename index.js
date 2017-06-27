#!/usr/bin/env node

const fs = require('fs')
const glob = require('glob')
const readPkgUp = require('read-pkg-up')
const gzip = require('gzip-size')
const bytes = require('bytes')
const { error, info } = require('prettycli')

const getConfig = () => {
  return new Promise((resolve, reject) => {
    readPkgUp().then(result => {
      if (!result.pkg.bundlesize) error('Config not found', { silent: true })
      const config = result.pkg.bundlesize
      resolve(config)
    })
  })
}

const getFiles = config => {
  const files = []
  return new Promise(resolve => {
    config.map(file => {
      const paths = glob.sync(file.path)
      paths.map(path => files.push({ threshold: file.threshold, path }))
    })
    resolve(files)
  })
}

const getSize = files => {
  return new Promise(resolve => {
    files.map(
      file => (file.size = gzip.sync(fs.readFileSync(file.path, 'utf8')))
    )
    resolve(files)
  })
}

const compare = files => {
  let fail = false

  files.map(file => {
    const prettySize = bytes(file.size)
    const prettyThreshold = bytes(bytes(file.threshold))

    if (file.size <= bytes(file.threshold)) {
      info(
        `PASS`,
        `${file.path}: ${prettySize} <= threshold ${prettyThreshold}`
      )
    } else {
      fail = true
      error(`${file.path}: ${prettySize} > threshold ${prettyThreshold}`, {
        fail: false
      })
    }
  })

  if (fail) process.exit(1)
}

getConfig().then(getFiles).then(getSize).then(compare)
