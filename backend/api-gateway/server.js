const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Proxy requests to microservices based on paths
app.use('/api/menu', createProxyMiddleware({ target: 'http://catalog-service:3001', changeOrigin: true }));
app.use('/api/auth', createProxyMiddleware({ target: 'http://auth-service:3003', changeOrigin: true }));
app.use('/api/orders', createProxyMiddleware({ target: 'http://order-service:3002', changeOrigin: true }));
app.use('/api/delivery', createProxyMiddleware({ target: 'http://delivery-service:3004', changeOrigin: true }));

app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
});
