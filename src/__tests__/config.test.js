jest.mock('read-pkg-up', () => {
  const mockPDJ = {
    bundlesize: [{ path: 'index.js', maxSize: '750B' }]
  }
  return {
    sync: () => ({ pkg: mockPDJ }),
    mockPDJ
  }
})
const readPkgUp = require('read-pkg-up')

describe('config.js', () => {
  let mockCommander
  beforeEach(() => {
    jest.resetModules()
    mockCommander = {
      option: () => mockCommander,
      parse: () => {},
      files: 'cli.js',
      maxSize: '30KB'
    }
  })
  it('has a files property', () => {
    const config = require('../config')
    expect(config.files).toBeDefined()
  })
  it('reads and uses cli options first', () => {
    jest.doMock('commander', () => mockCommander)
    const config = require('../config')
    expect(config.files).toMatchObject([
      {
        path: 'cli.js',
        maxSize: '30KB'
      }
    ])
  })
  it('uses package.json setting for "bundlesize" second', () => {
    mockCommander.files = null
    jest.doMock('commander', () => mockCommander)
    const config = require('../config')
    expect(config.files).toMatchObject(readPkgUp.mockPDJ.bundlesize)
  })
})
