const test = require('ava')
const { commandSync: cmd } = require('execa')

const bundlesize = `node ../../../index`

function run(fixture, customParams = '') {
  let output

  try {
    output = cmd(`${bundlesize} ${customParams}`, {
      cwd: `tests/fixtures/${fixture}`
    })
  } catch (error) {
    output = error
  }

  // make it a little easier to compare
  output.stdout = output.stdout.trim()

  return output
}

test.serial('pass: single file smaller than limit', t => {
  const { stdout, exitCode } = run(1)
  t.is(exitCode, 0)
  t.snapshot(stdout)
})

test.serial('fail: single file larger than limit', t => {
  const { stdout, exitCode } = run(2)
  t.is(exitCode, 1)
  t.snapshot(stdout)
})

test.serial('pass: use brotli', t => {
  const { stdout, exitCode } = run(3)
  t.is(exitCode, 0)
  t.snapshot(stdout)
})

test.serial('fail: dont use compression', t => {
  const { stdout, exitCode } = run(4)
  t.is(exitCode, 1)
  t.snapshot(stdout)
})

test.serial('pass: custom config file', t => {
  const { stdout, exitCode } = run(5, '--config config/bundlesize.json')
  t.is(exitCode, 0)
  t.snapshot(stdout)
})

test.serial('pass: multiple files, both smaller than limit', t => {
  const { stdout, exitCode } = run(6)
  t.is(exitCode, 0)
  t.snapshot(stdout)
})

test.serial('fail: multiple files, both bigger than limit', t => {
  const { stdout, exitCode } = run(7)
  t.is(exitCode, 1)
  t.snapshot(stdout)
})

test.serial('fail: multiple files, one smaller + one bigger than limit', t => {
  const { stdout, exitCode } = run(8)
  t.is(exitCode, 1)
  t.snapshot(stdout)
})
