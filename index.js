#!/usr/bin/env node

const fs = require('fs')
const glob = require('glob')
const gzip = require('gzip-size')
const bytes = require('bytes')
const { error, info } = require('prettycli')
const config = require('./src/config')

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

getFiles(config).then(getSize).then(compare)
