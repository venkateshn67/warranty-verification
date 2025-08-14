import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add loading indicator
const rootElement = document.getElementById('root');
if (rootElement) {
  // Show loading while React is initializing
  rootElement.innerHTML = `
    <div style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    ">
      <div style="text-align: center;">
        <div style="font-size: 64px; margin-bottom: 24px;">🛡️</div>
        <h1 style="margin: 0 0 16px 0; font-size: 28px;">Warranty System</h1>
        <div style="font-size: 18px; opacity: 0.9;">Loading...</div>
      </div>
    </div>
  `;
}

ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
