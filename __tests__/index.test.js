const test = require('ava')
const execa = require('execa')

test('Gives no errors when build size is less than the threshold value', t => {
  return execa
    .shell('bundlesize -f ./__tests__/dist/build.js -s 2KB')
    .then(result => {
      t.is(result.failed === false, true)
    })
})

test('Gives errors when build size is greater than the threshold value', t => {
  return execa
    .stderr('bundlesize -f ./__tests__/dist/build.js -s 0.001KB')
    .catch(error => {
      t.is(error.failed === true, true)
    })
})
