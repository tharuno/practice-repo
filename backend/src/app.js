const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const config = require('./config/env');
const pool = require('./config/database');
const healthRoutes = require('./routes/health.routes');

const app = express();

// Security and request middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health API
app.use('/api/health', healthRoutes);

// Database connectivity test
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS current_time');

    res.status(200).json({
      status: 'UP',
      database: 'PostgreSQL',
      connected: true,
      currentTime: result.rows[0].current_time
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);

    res.status(500).json({
      status: 'DOWN',
      database: 'PostgreSQL',
      connected: false
    });
  }
});

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

app.listen(config.port, '127.0.0.1', () => {
  console.log(
    `DevOpsHub API running on port ${config.port} in ${config.nodeEnv} mode`
  );
});
