const { describe, it } = require('node:test')
const assert = require('node:assert')

const express = require('express')

const { restApiProxyMiddleware } = require('./middleware-impl')

describe('restApiProxyMiddleware', () => {
  it('should the restApiProxyMiddleware handler exported correctly', () => {
    assert.strictEqual(typeof restApiProxyMiddleware === 'function', true)
  })

  it('should the restApiProxyMiddleware handler forwards requests and responses correctly', async () => {
    // targert service
    const productsService = express()
    productsService
      .get('/products', (_, response) => response.status(200).send('products'))
      .get('/products/:productId', (_, response) => response.set({ imed: 'jaberi' }).status(201).send('products'))
    const productsServicePort = 3333
    const productsServiceServer = productsService.listen(productsServicePort)
    // main app
    const app = express()
    const targetURL = `http://localhost:${productsServicePort}/products/123`
    app.get('/facade-api', restApiProxyMiddleware({ target: targetURL }))
    const appPort = 3334
    const appServer = app.listen(appPort)

    // invoke the request ....
    const response = await fetch(`http://localhost:${appPort}/facade-api`)

    // assert
    assert.strictEqual(response.status, 201)
    assert.strictEqual(response.headers.get('imed'), 'jaberi')
    assert.strictEqual(await response.text(), 'products')

    // clean-up
    productsServiceServer.close()
    appServer.close()
  })

  it('should the restApiProxyMiddleware handler throw when the passed target url is invalid', async () => {
    let appServer
    try {
      const app = express()
      const targetURL = 'localhost'
      app.get('/facade-api', restApiProxyMiddleware({ target: targetURL }))
      const appPort = 3334
      appServer = app.listen(appPort)

      // invoke the request ....
      await fetch(`http://localhost:${appPort}/facade-api`)
    } catch (error) {
      assert.strictEqual(error instanceof Error, true)
      assert.strictEqual(error.message.includes('invalid target param passed'), true)
    }

    // clean-up
    appServer?.close?.()
  })
})
