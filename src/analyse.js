/*
  loop through files and add
  pass: true|false
*/

const bytes = require('bytes')

function analyse(config) {
  return config.files.map(function(row) {
    row.filesMatched.map(function(file) {
      if (bytes.parse(file.size) > bytes.parse(row.maxSize)) file.pass = false
      else file.pass = true
    })
    return row
  })
}

module.exports = analyse
