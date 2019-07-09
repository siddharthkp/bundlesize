const colors = require('../utils/colors')

function pass() {
  // do nothing
}

function fail() {
  process.exit(1)
}

function error(err) {
  console.log(colors.fail('The build has an error: \n'))
  console.log(err)
  fail()
}

function report(results) {
  if (results.status === 'fail') fail()
  else pass()
}

module.exports = { report, error }
