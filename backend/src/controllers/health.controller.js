const healthCheck = (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'devopshub-api',
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  healthCheck
};
