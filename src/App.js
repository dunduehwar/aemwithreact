import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to <code>AEM + React</code>
        </p>
        <p>
          This is your React application integrated with Adobe Experience Manager.
        </p>
        <a
          className="App-link"
          href="https://experienceleague.adobe.com/docs/experience-manager-core-components/using/developing/overview.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn AEM Core Components
        </a>
        
        <div style={{ marginTop: '2rem' }}>
          <h2>Getting Started</h2>
          <p style={{ fontSize: '1rem', maxWidth: '600px', lineHeight: '1.5' }}>
            This React application is ready to be integrated with Adobe Experience Manager (AEM). 
            The AEM-specific dependencies are installed and ready to use when you connect this 
            app to an AEM instance.
          </p>
          
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="https://reactjs.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#61dafb', 
                color: '#000', 
                textDecoration: 'none', 
                borderRadius: '5px' 
              }}
            >
              React Docs
            </a>
            <a 
              href="https://experienceleague.adobe.com/docs/experience-manager-65/developing/spas/spa-overview.html" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#ff0000', 
                color: '#fff', 
                textDecoration: 'none', 
                borderRadius: '5px' 
              }}
            >
              AEM SPA Guide
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
