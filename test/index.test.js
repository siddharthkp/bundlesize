'use strict'

const path = require('path')

const getSize = require('../')

function fixture (name) {
  return path.join(__dirname, 'fixtures', `${ name }.js`)
}

it('returns 0 for empty project', () => {
  return getSize([fixture('empty')]).then(sizes => {
    expect(sizes).toEqual([
      { path: fixture('empty'), size: 0 }
    ])
  })
})

it('shows project size', () => {
  return getSize([fixture('big')]).then(sizes => {
    expect(sizes).toEqual([
      { path: fixture('big'), size: 2451 }
    ])
  })
})

it('accepts array', () => {
  return getSize([fixture('big'), fixture('index/index')]).then(sizes => {
    expect(sizes).toEqual([
      { path: fixture('big'), size: 2451 },
      { path: fixture('index/index'), size: 23 }
    ])
  })
})

it('returns error', () => {
  return getSize([fixture('unknown')]).catch(e => {
    expect(e.message).toContain('Can\'t resolve')
  })
})

it('supports Babili', () => {
  return getSize([fixture('es2016')], { minifier: 'babili' })
    .then(sizes => {
      expect(sizes).toEqual([
        { path: fixture('es2016'), size: 36 }
      ])
    })
})

it('removes non-production code', () => {
  return getSize(fixture('production')).then(sizes => {
    expect(sizes).toEqual([
      { path: fixture('production'), size: 9 }
    ])
  })
})
