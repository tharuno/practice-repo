const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'devopshub-api',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to DevOpsHub API'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`DevOpsHub API running on port ${PORT}`);
});
