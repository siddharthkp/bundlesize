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
  t.snapshot({ stdout, exitCode })
})

test.serial('fail: single file larger than limit', t => {
  const { stdout, exitCode } = run(2)
  t.snapshot({ stdout, exitCode })
})

test.serial('pass: use brotli which should pass', t => {
  const { stdout, exitCode } = run(3)
  t.snapshot({ stdout, exitCode })
})

test.serial('fail: use no compression which should fail', t => {
  const { stdout, exitCode } = run(4)
  t.snapshot({ stdout, exitCode })
})

test.serial('pass: custom config file', t => {
  const { stdout, exitCode } = run(5, '--config config/bundlesize.json')
  t.snapshot({ stdout, exitCode })
})
