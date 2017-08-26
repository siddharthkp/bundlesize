const fs = require('fs');
const bytes = require('bytes');
const glob = require('glob');
const gzip = require('gzip-size');
const { error } = require('prettycli');
const config = require('./config');
const debug = require('./debug');

const files = [];

config.map(file => {
  const paths = glob.sync(file.path);
  if (!paths.length) {
    error(`There is no matching file for ${file.path} in ${process.cwd()}`, {
      silent: true
    })
  } else {
    paths.map(path => {
      const size = gzip.sync(fs.readFileSync(path, 'utf8'));
      const maxSize = bytes(file.threshold || file.maxSize) || Infinity;
      files.push({ maxSize, path, size });
    });
  }
});

debug('files', files);

module.exports = files;
