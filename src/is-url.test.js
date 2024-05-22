const { describe, it } = require('node:test')
const assert = require('node:assert')

const { isURL } = require('./is-url')

describe('isURL', () => {
  it('should the isURL utility exposed correctly', () => {
    assert.strictEqual(typeof isURL === 'function', true)
  })

  it('should the isURL utility validate the valid URLs correctly', () => {
    assert.strictEqual(isURL('http://example.com'), true)
    assert.strictEqual(isURL('https://example.com'), true)
    assert.strictEqual(isURL('ftp://example.com'), true)
  })

  it('should the isURL utility validate the invalid URLs correctly', () => {
    assert.strictEqual(isURL('not-a-url'), false)
    assert.strictEqual(isURL('http/example.com'), false)
    assert.strictEqual(isURL(''), false)
  })
})
