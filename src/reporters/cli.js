const rightpad = require('right-pad')
const figures = require('figures')
const bytes = require('bytes')

const colors = require('../utils/colors')

function report(results) {
  const maxFileLength = getMaxFileLenght(results)

  const counter = { pass: 0, fail: 0 }

  results.forEach(function(row) {
    console.log()
    console.log(colors.subtle(`${figures.line} ${row.path}`))
    row.filesMatched.forEach(function(file) {
      const symbol = getSymbol(file)
      const operator = getOperator(file, row)

      if (file.pass) counter.pass++
      else counter.fail++

      console.log(
        ' ',
        symbol,
        rightpad(file.path, maxFileLength),
        '  ',
        bytes(file.size),
        operator,
        row.maxSize,
        colors.subtle(row.compression || 'gzip')
      )

      // > maxSize ${prettySize} ${compressionText}
    })
  })
  console.log()

  if (counter.pass) console.log(' ', colors.pass(counter.pass, 'checks passed'))
  if (counter.fail) console.log(' ', colors.fail(counter.fail, 'checks failed'))

  console.log()

  // exit with error code 1 if there are any errors
  if (counter.fail) process.exit(1)
}

module.exports = { report }

function getMaxFileLenght(results) {
  let maxFileLength = 0

  results.forEach(function(row) {
    row.filesMatched.forEach(function(file) {
      if (file.path.length > maxFileLength) maxFileLength = file.path.length
    })
  })

  return maxFileLength
}

function getSymbol(file) {
  return file.pass ? colors.pass(figures.tick) : colors.fail(figures.cross)
}

function getOperator(file, row) {
  const fileSize = bytes.parse(file.size)
  const maxSize = bytes.parse(row.maxSize)

  if (fileSize > maxSize) return colors.fail('>')
  if (fileSize === maxSize) return colors.pass('=')
  return colors.pass('<')
}
