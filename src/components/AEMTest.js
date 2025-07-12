import React, { useState, useEffect } from 'react';

/**
 * Simple AEM Connection Test Component
 * 
 * This component tests the AEM connection and displays the results
 */
const AEMTest = () => {
  const [status, setStatus] = useState('Testing...');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testAEMConnection = async () => {
      try {
        // Test direct AEM connection
        console.log('🔍 Testing AEM connection...');
        
        const response = await fetch('/bin/pagedata?path=/content/myproject/us/en/home');
        
        if (response.ok) {
          const result = await response.json();
          console.log('✅ AEM connection successful:', result);
          setStatus('✅ Connected to AEM');
          setData(result);
        } else {
          console.error('❌ AEM response error:', response.status, response.statusText);
          setStatus('❌ AEM connection failed');
          setError(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (err) {
        console.error('❌ AEM connection error:', err);
        setStatus('❌ Connection error');
        setError(err.message);
      }
    };

    testAEMConnection();
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>🔧 AEM Connection Test</h1>
      
      <div style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>Connection Status:</h3>
        <p style={{ fontSize: '18px', margin: '10px 0' }}>{status}</p>
        
        {error && (
          <div style={{ 
            backgroundColor: '#ffebee', 
            padding: '10px', 
            borderRadius: '4px',
            color: '#c62828'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Test Details:</h3>
        <ul>
          <li>AEM URL: <code>http://localhost:4502</code></li>
          <li>Endpoint: <code>/bin/pagedata</code></li>
          <li>Page Path: <code>/content/myproject/us/en/home</code></li>
          <li>Proxy: <code>Enabled via React dev server</code></li>
        </ul>
      </div>

      {data && (
        <div style={{ marginBottom: '20px' }}>
          <h3>📊 AEM Response Data:</h3>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '15px', 
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '12px',
            border: '1px solid #ddd'
          }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '15px', 
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <h4>💡 Troubleshooting:</h4>
        <ol>
          <li>Make sure AEM is running on <code>localhost:4502</code></li>
          <li>Check if the page exists: <code>/content/myproject/us/en/home</code></li>
          <li>Verify the pagedata servlet is available</li>
          <li>Check browser console for detailed errors</li>
        </ol>
      </div>
    </div>
  );
};

export default AEMTest;
