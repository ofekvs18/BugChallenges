import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [customInput, setCustomInput] = useState('');
  const [nestedInput, setNestedInput] = useState('');
  const [performanceData, setPerformanceData] = useState({
    requests: 0,
    avgResponseTime: 0,
    successRate: 100
  });

  // Monitor performance
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceData(prev => ({
        requests: prev.requests,
        avgResponseTime: prev.avgResponseTime,
        successRate: prev.successRate
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const makeRequest = async (endpoint, data = null, testKey) => {
    setLoading(prev => ({ ...prev, [testKey]: true }));
    setResults(prev => ({ ...prev, [testKey]: null }));
    
    const startTime = Date.now();
    
    try {
      const config = {
        timeout: 30000, // 30 second timeout
        headers: {
          'Content-Type': 'application/json',
        }
      };

      const response = data 
        ? await axios.post(`${API_BASE}${endpoint}`, data, config)
        : await axios.get(`${API_BASE}${endpoint}`, config);
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      setResults(prev => ({ 
        ...prev, 
        [testKey]: { 
          success: true, 
          data: response.data,
          responseTime: responseTime
        }
      }));
      
      setPerformanceData(prev => ({
        requests: prev.requests + 1,
        avgResponseTime: Math.round((prev.avgResponseTime + responseTime) / 2),
        successRate: Math.round(((prev.requests * prev.successRate / 100) + 1) / (prev.requests + 1) * 100)
      }));
      
    } catch (error) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      setResults(prev => ({ 
        ...prev, 
        [testKey]: { 
          success: false, 
          error: error.message || 'Unknown error',
          responseTime: responseTime,
          details: error.response?.data || 'No additional details'
        }
      }));
      
      setPerformanceData(prev => ({
        requests: prev.requests + 1,
        avgResponseTime: Math.round((prev.avgResponseTime + responseTime) / 2),
        successRate: Math.round(((prev.requests * prev.successRate / 100)) / (prev.requests + 1) * 100)
      }));
    } finally {
      setLoading(prev => ({ ...prev, [testKey]: false }));
    }
  };

  const renderResult = (testKey) => {
    if (loading[testKey]) {
      return (
        <div className="result-loading">
          <div className="spinner"></div>
          <span>Processing request... (this might take a while)</span>
        </div>
      );
    }
    
    if (!results[testKey]) return null;
    
    if (results[testKey].success) {
      return (
        <div className="result-success">
          <strong>✅ Success ({results[testKey].responseTime}ms)</strong>
          <pre>{JSON.stringify(results[testKey].data, null, 2)}</pre>
        </div>
      );
    } else {
      return (
        <div className="result-error">
          <strong>❌ Error ({results[testKey].responseTime}ms)</strong>
          <p><strong>Message:</strong> {results[testKey].error}</p>
          {results[testKey].details && (
            <div>
              <strong>Details:</strong>
              <pre>{JSON.stringify(results[testKey].details, null, 2)}</pre>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>🌀 Challenge 2: The Infinite Loop Labyrinth</h1>
        <p>Test the API endpoints below. Some requests may hang or timeout...</p>
      </div>

      <div className="info-box">
        <strong>🎯 Your Mission:</strong> The frontend works perfectly, but something in the backend 
        causes certain requests to hang indefinitely. Identify which endpoints are problematic and fix the infinite loops.
      </div>

      <div className="performance-monitor">
        <h3>📊 Performance Monitor</h3>
        <div className="monitor-grid">
          <div className="monitor-item">
            <div className="monitor-value">{performanceData.requests}</div>
            <div className="monitor-label">Total Requests</div>
          </div>
          <div className="monitor-item">
            <div className="monitor-value">{performanceData.avgResponseTime}ms</div>
            <div className="monitor-label">Avg Response Time</div>
          </div>
          <div className="monitor-item">
            <div className="monitor-value">{performanceData.successRate}%</div>
            <div className="monitor-label">Success Rate</div>
          </div>
        </div>
      </div>

      <div className="challenge-grid">
        <div className="test-card">
          <h3>🔄 Basic Health Check</h3>
          <p>Test if the backend is responding</p>
          <button 
            className="test-button"
            onClick={() => makeRequest('/health', null, 'health')}
            disabled={loading.health}
          >
            Test Health Endpoint
          </button>
          {renderResult('health')}
        </div>

        <div className="test-card">
          <h3>📊 Simple Data Processing</h3>
          <p>Process a simple array of numbers</p>
          <button 
            className="test-button"
            onClick={() => makeRequest('/api/process-simple', 
              { data: [1, 2, 3, 4, 5] }, 'simple')}
            disabled={loading.simple}
          >
            Process Simple Data
          </button>
          {renderResult('simple')}
        </div>

        <div className="test-card">
          <h3>🌀 Nested Data Processing <span className="warning-badge">May Hang</span></h3>
          <p>Process nested data structures</p>
          <input
            type="text"
            className="test-input"
            placeholder="Enter JSON data (or leave empty for default)"
            value={nestedInput}
            onChange={(e) => setNestedInput(e.target.value)}
          />
          <button 
            className="test-button warning"
            onClick={() => {
              let data;
              try {
                data = nestedInput ? JSON.parse(nestedInput) : {
                  items: [
                    { id: 1, children: [{ id: 2, children: [] }] },
                    { id: 3, children: [{ id: 4, children: [{ id: 5, children: [] }] }] }
                  ]
                };
              } catch {
                data = { error: "Invalid JSON" };
              }
              makeRequest('/api/process-nested', { data }, 'nested');
            }}
            disabled={loading.nested}
          >
            Process Nested Data
          </button>
          {renderResult('nested')}
        </div>

        <div className="test-card">
          <h3>🔗 Circular Reference Test <span className="danger-badge">Will Hang</span></h3>
          <p>Test data with circular references</p>
          <button 
            className="test-button danger"
            onClick={() => {
              // Create circular reference
              const obj1 = { id: 1, name: "parent" };
              const obj2 = { id: 2, name: "child", parent: obj1 };
              obj1.children = [obj2];
              
              makeRequest('/api/process-circular', { data: obj1 }, 'circular');
            }}
            disabled={loading.circular}
          >
            ⚠️ Test Circular References
          </button>
          {renderResult('circular')}
        </div>

        <div className="test-card">
          <h3>🎲 Custom Data Test</h3>
          <p>Send your own data to the processor</p>
          <input
            type="text"
            className="test-input"
            placeholder="Enter custom JSON data"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
          />
          <button 
            className="test-button"
            onClick={() => {
              let data;
              try {
                data = JSON.parse(customInput || '{"test": "data"}');
              } catch {
                data = { error: "Invalid JSON - using default data", test: "data" };
              }
              makeRequest('/api/process-custom', { data }, 'custom');
            }}
            disabled={loading.custom}
          >
            Process Custom Data
          </button>
          {renderResult('custom')}
        </div>

        <div className="test-card">
          <h3>📈 Deep Recursion Test <span className="danger-badge">Will Hang</span></h3>
          <p>Test deeply nested recursive structures</p>
          <button 
            className="test-button danger"
            onClick={() => {
              // Create deeply nested structure
              let deepData = { level: 0 };
              let current = deepData;
              for (let i = 1; i <= 100; i++) {
                current.next = { level: i };
                current = current.next;
              }
              // Add circular reference at the end
              current.next = deepData;
              
              makeRequest('/api/process-deep', { data: deepData }, 'deep');
            }}
            disabled={loading.deep}
          >
            ⚠️ Test Deep Recursion
          </button>
          {renderResult('deep')}
        </div>
      </div>

      <div className="info-box">
        <strong>💡 Debugging Tips:</strong>
        <ul style={{ textAlign: 'left', marginTop: '1rem' }}>
          <li>Monitor the backend container logs: <code>docker-compose logs backend</code></li>
          <li>Check CPU usage during problematic requests</li>
          <li>Look for patterns in which data structures cause problems</li>
          <li>Consider timeout mechanisms and circuit breakers</li>
        </ul>
      </div>
    </div>
  );
}

export default App;