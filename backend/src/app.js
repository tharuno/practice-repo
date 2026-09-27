const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const config = require('./config/env');
const healthRoutes = require('./routes/health.routes');

const app = express();

// Security and request middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health API
app.use('/api/health', healthRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to DevOpsHub API'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'ERROR',
    message: 'Route not found'
  });
});

app.listen(config.port, '0.0.0.0', () => {
  console.log(
    `DevOpsHub API running on port ${config.port} in ${config.nodeEnv} mode`
  );
});
