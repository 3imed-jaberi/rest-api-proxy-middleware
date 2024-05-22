const { describe, it } = require('node:test')
const assert = require('node:assert')

const { isURL, restApiProxyMiddleware } = require('./index')

describe('module-port: index', () => {
  it('should the isURL utility exposed correctly', () => {
    assert.strictEqual(typeof isURL === 'function', true)
  })

  it('should the restApiProxyMiddleware middleware exposed correctly', () => {
    assert.strictEqual(typeof restApiProxyMiddleware === 'function', true)
  })
})
