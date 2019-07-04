const rightpad = require('right-pad')
const figures = require('figures')
const bytes = require('bytes')
const plur = require('plur')

const colors = require('../utils/colors')

function report(results) {
  const maxFileLength = getMaxFileLenght(results)

  const counter = { pass: 0, fail: 0 }

  results.forEach(function(row) {
    printBlockHeader(row)

    row.filesMatched.forEach(function(file) {
      printRow(file, row, maxFileLength)

      if (file.pass) counter.pass++
      else counter.fail++
    })
  })

  printSummary(counter)

  // exit with error code 1 if there are any failed checks
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

function printBlockHeader(row) {
  console.log()
  console.log(colors.subtle(`${figures.line} ${row.path}`))
}

function printRow(file, row, maxFileLength) {
  const symbol = getSymbol(file)
  const operator = getOperator(file, row)

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
}

function printSummary({ pass, fail }) {
  console.log()

  if (pass) console.log(colors.pass(' ', pass, plur('check', pass), 'passed'))
  if (fail) console.log(colors.fail(' ', fail, plur('check', fail), 'failed'))

  console.log()
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
