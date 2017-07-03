'use strict'

const gzipSize = require('gzip-size')
const path = require('path')

const promisify = require('./src/promisify')
const pack = require('./src/pack')

/**
 * Return size of project files with all dependencies and after UglifyJS
 * and gzip.
 *
 * @param {string[]} files Files to get size.
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
 * getSizes([index, extra]).then(sizes => {
 *   for (const data of sizes) {
 *     console.log(data.file, data.size)
 *   }
 * })
 */
function getSizes (files, opts) {
  if (typeof files === 'string') files = [files]
  if (!opts) opts = { }

  return pack(files, opts).then(stats => {
    if (stats.hasErrors()) {
      throw new Error(stats.toString('errors-only'))
    }

    const dir = stats.compilation.outputOptions.path
    const fs = stats.compilation.compiler.outputFileSystem
    return Promise.all(files.map((file, i) => {
      const bundle = path.join(dir, i + '.js')
      return promisify(done => fs.readFile(bundle, 'utf8', done))
        .then(content => {
          return promisify(done => gzipSize(content, done))
        }).then(size => {
          return { file, size: size - 284 }
        })
    }))
  })
}

module.exports = getSize
