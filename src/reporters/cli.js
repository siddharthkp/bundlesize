const rightpad = require('right-pad')
const figures = require('figures')
const bytes = require('bytes')
const plur = require('plur')

const colors = require('../utils/colors')

function report(results) {
  const files = results.files

  const maxFileLength = getMaxFileLenght(files)

  files.forEach(function(row) {
    printBlockHeader(row)

    row.filesMatched.forEach(function(file) {
      printRow(file, row, maxFileLength)
    })
  })

  printSummary(results.counter)
}

module.exports = { report }

function getMaxFileLenght(files) {
  let maxFileLength = 0

  files.forEach(function(row) {
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
  const operator = getOperator(file)

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

function getOperator(file) {
  const map = {
    '>': colors.fail('>'),
    '<': colors.pass('<'),
    '=': colors.pass('=')
  }

  return map[file.operator]
}
