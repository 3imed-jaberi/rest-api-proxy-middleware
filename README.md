# REST API Proxy Middleware

Express oriented middleware which make the proxying simple with REST APIs.

**Built on top of native Node.js modules, without any dependencies.**

## `Installation`

```bash
# npm ..
$ npm install rest-api-proxy-middleware
# yarn ..
$ yarn add rest-api-proxy-middleware
```

## `Usage`

This is a practical example of how to use.

```javascript
const express = require('express');
const { restApiProxyMiddleware } = require ('rest-api-proxy-middleware');
const app = express();

const target = 'http://jsonplaceholder.typicode.com/todos/1';
app.use('/proxy-gateway', restApiProxyMiddleware({ target }));

// We have extra options can be passed like:
// - httpClient: help to replace the default native 'http' module with 'https'.
// - onError: help to handle the produced errors.
```

#### License
---

[MIT](LICENSE) &copy; [Imed Jaberi](https://github.com/3imed-jaberi)
