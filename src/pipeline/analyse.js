/*
  loop through files and add
  pass: true|false
*/

const bytes = require('bytes')

function analyse(config) {
  const counter = { pass: 0, fail: 0 }

  const files = config.files.map(function(row) {
    row.filesMatched.map(function(file) {
      const parsedFileSize = bytes.parse(file.size)
      const parsedMaxSize = bytes.parse(row.maxSize)

      if (parsedFileSize > parsedMaxSize) {
        file.pass = false
        file.operator = '>'
      } else if (parsedFileSize < parsedMaxSize) {
        file.pass = true
        file.operator = '<'
      } else {
        file.pass = true
        file.operator = '='
      }

      if (file.pass) counter.pass++
      else counter.fail++
    })
    return row
  })

  const status = counter.fail ? 'fail' : 'pass'

  return { files, counter, status }
}

module.exports = analyse
