const test = require('ava')
const { commandSync: cmd } = require('execa')

const bundlesize = `node ../../../index`

function run(fixture) {
  let output

  try {
    output = cmd(bundlesize, { cwd: `tests/fixtures/${fixture}` })
  } catch (error) {
    output = error
  }

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
