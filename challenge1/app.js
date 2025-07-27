const express = require('express');
const path = require('path');
const _ = require('lodash');
const moment = require('moment');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/status', (req, res) => {
    const status = {
        service: 'Phantom Package Challenge',
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        version: '1.0.0',
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        memory: process.memoryUsage(),
        packages: {
            express: require('express/package.json').version,
            lodash: require('lodash/package.json').version,
            moment: require('moment/package.json').version,
            axios: require('axios/package.json').version
        }
    };
    
    res.json(status);
});

app.get('/api/data', (req, res) => {
    // Using lodash to demonstrate package functionality
    const sampleData = [
        { id: 1, name: 'Alice', age: 30, city: 'New York' },
        { id: 2, name: 'Bob', age: 25, city: 'San Francisco' },
        { id: 3, name: 'Charlie', age: 35, city: 'Chicago' },
        { id: 4, name: 'Diana', age: 28, city: 'Seattle' }
    ];
    
    const processedData = {
        total: sampleData.length,
        avgAge: _.meanBy(sampleData, 'age'),
        cities: _.uniq(_.map(sampleData, 'city')),
        users: _.sortBy(sampleData, 'name')
    };
    
    res.json(processedData);
});

app.get('/api/external', async (req, res) => {
    try {
        // Using axios to make an external request
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        res.json({
            message: 'External API call successful',
            data: response.data,
            timestamp: moment().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch external data',
            message: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message,
        timestamp: moment().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.path,
        method: req.method,
        timestamp: moment().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Phantom Package Challenge server running on port ${PORT}`);
    console.log(`📅 Started at: ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔍 Visit: http://localhost:${PORT}`);
});

module.exports = app;