import httpProxy from 'http-proxy-3';
//
// Create your proxy server
//
httpProxy.createProxyServer({ target: 'http://localhost:9000' }).listen(process.env.PORT || 8000);
