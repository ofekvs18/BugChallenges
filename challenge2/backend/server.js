const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { processData, processNestedData, processCircularData, countProperties, flattenObject } = require('./utils/dataProcessor');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check endpoint (works fine)
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: '1.0.0'
  });
});

// Simple data processing (works fine)
app.post('/api/process-simple', (req, res) => {
  try {
    const { data } = req.body;
    
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Data must be an array' });
    }
    
    const result = {
      original: data,
      processed: {
        sum: data.reduce((acc, val) => acc + (typeof val === 'number' ? val : 0), 0),
        count: data.length,
        average: data.length > 0 ? data.reduce((acc, val) => acc + (typeof val === 'number' ? val : 0), 0) / data.length : 0,
        max: Math.max(...data.filter(val => typeof val === 'number')),
        min: Math.min(...data.filter(val => typeof val === 'number'))
      },
      timestamp: new Date().toISOString()
    };
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Nested data processing (has infinite loop bug)
app.post('/api/process-nested', (req, res) => {
  try {
    console.log('Processing nested data...');
    const { data } = req.body;
    
    // This will cause infinite loop with circular references
    const result = processNestedData(data);
    
    res.json({
      processed: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in nested processing:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Circular reference processing (will definitely hang)
app.post('/api/process-circular', (req, res) => {
  try {
    console.log('Processing circular data...');
    const { data } = req.body;
    
    // This will definitely cause infinite loop
    const result = processCircularData(data);
    
    res.json({
      processed: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in circular processing:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Custom data processing (may hang depending on input)
app.post('/api/process-custom', (req, res) => {
  try {
    console.log('Processing custom data...');
    const { data } = req.body;
    
    // Use the generic processor which has the bug
    const result = processData(data);
    
    res.json({
      processed: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in custom processing:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Deep recursion processing (will hang)
app.post('/api/process-deep', (req, res) => {
  try {
    console.log('Processing deep nested data...');
    const { data } = req.body;
    
    // This will cause stack overflow or infinite loop
    const result = processNestedData(data);
    
    res.json({
      processed: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in deep processing:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📅 Started at: ${new Date().toISOString()}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⚠️  Warning: This server contains infinite loop bugs for debugging practice`);
});

module.exports = app;