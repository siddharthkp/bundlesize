'use strict'

const spawn = require('cross-spawn')
const path = require('path')

function fixture (file) {
  return path.join(__dirname, 'fixtures', file)
}

function run (args, options, env) {
  if (!options) options = { }
  options.env = {
    TRAVIS_JOB_NUMBER: '1.1',
    APPVEYOR_JOB_NUMBER: '1'
  }
  for (const i in process.env) {
    if (!options.env[i]) options.env[i] = process.env[i]
  }
  for (const i in env) {
    options.env[i] = env[i]
  }
  const cli = spawn(path.join(__dirname, '../cli.js'), args, options)
  return new Promise(resolve => {
    let out = ''
    cli.stdout.on('data', data => {
      out += data.toString()
    })
    cli.stderr.on('data', data => {
      out += data.toString()
    })
    cli.on('close', code => {
      resolve({ code, out })
    })
  })
}

it('returns help', () => {
  return run(['--help']).then(result => {
    expect(result.out).toContain('Examples:')
    expect(result.code).toEqual(0)
  })
})

it('returns version', () => {
  return run(['--version']).then(result => {
    expect(result.out).toMatch(/\d+\.\d+\.\d+/)
    expect(result.code).toEqual(0)
  })
})

it('shows sizes', () => {
  return run([
    'test/fixtures/big.js',
    'test/fixtures/empty.js'
  ]).then(result => {
    expect(result.out).toEqual(
      ' INFO  test/fixtures/big.js: 2.39 KB \n' +
      '\n' +
      ' INFO  test/fixtures/empty.js: 0 B \n' +
      '\n'
    )
    expect(result.code).toEqual(0)
  })
})

it('supports absolute path', () => {
  return run([path.join(__dirname, 'fixtures/empty.js')]).then(result => {
    expect(result.out).toContain('0 B')
    expect(result.code).toEqual(0)
  })
})

it('shows resolve errors', () => {
  return run(['unknown.js']).then(result => {
    expect(result.out).toContain(' ERROR  Can\'t resolve')
    expect(result.out).toContain('unknown.js')
    expect(result.code).toEqual(1)
  })
})

it('shows analyzer', () => {
  return run(['--why', 'test/fixtures/empty.js']).then(result => {
    expect(result.out).toContain('Webpack Bundle Analyzer')
    expect(result.code).toEqual(0)
  })
})

it('uses Babili', () => {
  return run(['--babili', 'test/fixtures/es2016.js']).then(result => {
    expect(result.out).toContain('36 B')
    expect(result.code).toEqual(0)
  })
})

it('runs only on first job in Travis CI', () => {
  const env = { TRAVIS: '1', TRAVIS_JOB_NUMBER: '1.2' }
  return run([], { }, env).then(result => {
    expect(result.out).toContain('first CI job')
    expect(result.code).toEqual(0)
  })
})

it('checks limits', () => {
  return run([], { cwd: fixture('good') }).then(result => {
    expect(result.out).toEqual(
      ' PASS  index.js: 2.39 KB < threshold 3 KB gzip \n' +
      '\n' +
      ' PASS  index.js: 2.39 KB < threshold 3 KB gzip \n' +
      '\n' +
      ' PASS  index.js: 2.39 KB < threshold 3 KB gzip \n' +
      '\n'
    )
    expect(result.code).toEqual(0)
  })
})

it('shows error', () => {
  return run([], { cwd: fixture('bad') }).then(result => {
    expect(result.out).toEqual(
      ' ERROR  index.js: 2.39 KB > threshold 2 KB gzip \n' +
      '\n'
    )
    expect(result.code).toEqual(3)
  })
})
