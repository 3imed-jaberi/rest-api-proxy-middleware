const { isURL } = require('./is-url')
const { restApiProxyMiddleware } = require('./middleware-impl')

module.exports = {
  isURL,
  restApiProxyMiddleware
}
