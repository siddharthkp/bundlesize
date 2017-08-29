const { danger, fail, warn } = require('danger')

// Thanks to https://github.com/styleguidist/react-styleguidist/blob/master/dangerfile.js and sapegin
const packageChanged = danger.git.modified_files.indexOf('package.json') !== -1
const lockfileChanged =
  danger.git.modified_files.indexOf('package-lock.json') !== -1
if (packageChanged && !lockfileChanged) {
  fail(`Changes were made to package.json, but not to package-lock.json.
Perhaps you need to run \`rm package-lock.json && npm install\`. Make sure you’re using npm 5+.`)
}

if (danger.github.pr.body.length < 10) {
  warn('This pull request needs an description.')
}
