'use strict'

const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const Babili = require('babili-webpack-plugin')

const promisify = require('./promisify')

function getConfig (file, opts) {
  const config = {
    entry: file,
    output: {
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  }

  if (opts.minifier === 'babili') {
    config.plugins.push(new Babili())
  } else {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: {
        screw_ie8: true
      },
      compress: {
        screw_ie8: true
      },
      compressor: {
        warnings: false
      },
      output: {
        comments: false
      }
    }))
  }

  if (opts.analyzer) {
    config.plugins.push(new Analyzer({
      openAnalyzer: opts.analyzer === 'server',
      analyzerMode: opts.analyzer,
      defaultSizes: 'gzip'
    }))
  }

  return config
}

module.exports = function pack (file, opts) {
  return promisify(done => {
    const compiler = webpack(getConfig(file, opts))
    compiler.outputFileSystem = new MemoryFS()
    compiler.run(done)
  })
}
