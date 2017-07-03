'use strict'

const gzipSize = require('gzip-size')
const path = require('path')

const promisify = require('./src/promisify')
const pack = require('./src/pack')

/**
 * Return size of project files with all dependencies and after UglifyJS
 * and gzip.
 *
 * @param {string|string[]} files Files to get size.
 * @param {object} [opts] Extra options.
 * @param {"server"|"static"|false} [opts.analyzer] Show package content
 *                                                  in browser.
 * @param {"uglifyjs"|"babili"} [opts.minifier="uglifyjs"] Minifier.
 *
 * @return {Promise} Promise with size of files
 *
 * @example
 * const getSize = require('size-limit')
 *
 * const index = path.join(__dirname, 'index.js')
 * const extra = path.join(__dirname, 'extra.js')
 *
 * getSize([index, extra]).then(size => {
 *   if (size > 1 * 1024 * 1024) {
 *     console.error('Project become bigger than 1MB')
 *   }
 * })
 */
function getSize (files, opts) {
  if (typeof files === 'string') files = [files]
  if (!opts) opts = { }

  return pack(files, opts).then(stats => {
    if (stats.hasErrors()) {
      throw new Error(stats.toString('errors-only'))
    }

    const out = stats.compilation.outputOptions
    const file = path.join(out.path, out.filename)
    const fs = stats.compilation.compiler.outputFileSystem

    return promisify(done => fs.readFile(file, 'utf8', done))
  }).then(content => {
    return promisify(done => gzipSize(content, done))
  }).then(size => {
    return size - 293
  })
}

module.exports = getSize
