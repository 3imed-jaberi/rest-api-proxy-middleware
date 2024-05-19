const http = require('node:http');

const { isURL } = require('./is-url')

function restApiProxyMiddleware(config) {
  const { target, httpClient = http, onError = (error, request, response) => {} } = config;
  if (!isURL(target)) throw new Error('[createRestApiProxyMiddleware]: invalid target param passed! the target param should be a valid URL')
  
  return (request, response) => {
    const proxyRequest = httpClient.request(target, (proxyResponse) => {
      // forward the status code and headers ... 
      response.status(proxyResponse.statusCode);
      response.set(proxyResponse.headers);

      // pipe the proxy response data to current express response
      proxyResponse.pipe(response, { end: true });
    });

     // handle errors
     proxyRequest.on('error', (error) => onError(error, request, response));

     // pipe the request data to the proxy request
     request.pipe(proxyRequest, { end: true });
  }
}

module.exports = { restApiProxyMiddleware }
