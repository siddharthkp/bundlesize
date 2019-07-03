const chalk = require('chalk')

module.exports = {
  pass: chalk.green,
  error: chalk.red,
  skip: chalk.yellow,
  log: chalk.gray,
  title: chalk.bold,
  log: chalk.gray,
  duration: chalk.gray.dim,
  errorSource: chalk.gray,
  errorStack: chalk.gray,
  stack: chalk.red,
  information: chalk.magenta
}
