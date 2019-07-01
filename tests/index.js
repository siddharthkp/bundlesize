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

test.serial('1. pass: single file smaller than limit', t => {
  const { stdout, exitCode } = run(1)
  t.is(exitCode, 0)
  t.snapshot(stdout)
})

test.serial('2. fail: single file larger than limit', t => {
  const { stdout, exitCode } = run(2)
  t.is(exitCode, 1)
  t.snapshot(stdout)
})

test.serial('3. pass: use brotli', t => {
  const { stdout, exitCode } = run(3)
  t.is(exitCode, 0)
  t.snapshot(stdout)
})

test.serial('4. fail: dont use compression', t => {
  const { stdout, exitCode } = run(4)
  t.is(exitCode, 1)
  t.snapshot(stdout)
})

test.serial('5. pass: custom config file', t => {
  const { stdout, exitCode } = run(5, '--config config/bundlesize.json')
  t.is(exitCode, 0)
  t.snapshot(stdout)
})

test.serial('6. pass: multiple files, both smaller than limit', t => {
  const { stdout, exitCode } = run(6)
  t.is(exitCode, 0)
  t.snapshot(stdout)
})

test.serial('7. fail: multiple files, both bigger than limit', t => {
  const { stdout, exitCode } = run(7)
  t.is(exitCode, 1)
  t.snapshot(stdout)
})

test.serial('8. fail: multiple files, 1 smaller + 1 bigger than limit', t => {
  const { stdout, exitCode } = run(8)
  t.is(exitCode, 1)
  t.snapshot(stdout)
})

test.serial('9. pass: catch all js files', t => {
  const { stdout, exitCode } = run(9)
  t.is(exitCode, 0)
  t.snapshot(stdout)
})

test.serial('10. pass: match by fuzzy name', t => {
  const { stdout, exitCode } = run(10)
  t.is(exitCode, 0)
  t.snapshot(stdout)
})

/*
  Bug repro!

  With a config like:
  { path: "build/**\/*.js", maxSize: "250B" }
  { path: "build/**\/chunk-*.js", maxSize: "300B" },

  The intented config here is - 250B for all JS files,
  and a more lineant 300B for chunk files.

  but, the ** wildcard matches the more specific chunk file
  as well - which means it's compared with both the limits.

  PASS  build/chunks/chunk-ch0nk.js: 270B < maxSize 300B (gzip)
  FAIL  build/chunks/chunk-ch0nk.js: 270B > maxSize 250B (gzip)

  This fails the build which is silly.

  FIX: Deduplicate files with preference to more specific path.

  Note: We skip the failing test in suite. Enable it by making it
  test.serial
*/

test.skip('11. bug repro: bundlesize should dedup files', t => {
  const { stdout, exitCode } = run(11)
  t.is(exitCode, 0) // this is failing
  t.snapshot(stdout)
})
