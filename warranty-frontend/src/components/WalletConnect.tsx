import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WalletConnect: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      title: 'Install Petra Wallet',
      description: 'Download and install Petra wallet extension',
      status: 'process',
      icon: '📥',
      content: (
        <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', marginTop: '16px' }}>
          <h4 style={{ marginBottom: '16px' }}>Installation Steps:</h4>
          <ol style={{ paddingLeft: '20px', textAlign: 'left' }}>
            <li>Go to <a href="https://petra.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff' }}>petra.app</a></li>
            <li>Click "Install Extension" for Chrome</li>
            <li>Add the extension to your browser</li>
            <li>Pin the extension to your toolbar for easy access</li>
          </ol>
          <button 
            style={{
              background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '20px',
              fontSize: '14px',
              cursor: 'pointer',
              marginTop: '16px'
            }}
            onClick={() => window.open('https://chrome.google.com/webstore/detail/petra-aptos-wallet/ejjladinnckdgjemekebkmpebppconhe', '_blank')}
          >
            Install Petra Wallet
          </button>
        </div>
      )
    },
    {
      title: 'Setup Wallet',
      description: 'Create or import your wallet',
      status: 'wait',
      icon: '⚙️',
      content: (
        <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', marginTop: '16px' }}>
          <h4 style={{ marginBottom: '16px' }}>Wallet Setup:</h4>
          <ul style={{ paddingLeft: '20px', textAlign: 'left' }}>
            <li>Open Petra Wallet extension</li>
            <li>Choose "Create New Wallet" or "Import Existing Wallet"</li>
            <li>Write down your recovery phrase (12 words)</li>
            <li>Set a strong password</li>
            <li>Verify your recovery phrase</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Select Network',
      description: 'Switch to Aptos Testnet',
      status: 'wait',
      icon: '🌐',
      content: (
        <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', marginTop: '16px' }}>
          <h4 style={{ marginBottom: '16px' }}>Network Configuration:</h4>
          <ul style={{ paddingLeft: '20px', textAlign: 'left' }}>
            <li>Open Petra Wallet settings</li>
            <li>Go to "Network" section</li>
            <li>Select "Aptos Testnet" from the dropdown</li>
            <li>Ensure the network is active</li>
          </ul>
          <div style={{ 
            background: '#fff3cd', 
            border: '1px solid #ffeaa7', 
            borderRadius: '8px', 
            padding: '12px', 
            marginTop: '16px',
            color: '#856404'
          }}>
            <strong>Important:</strong> Make sure you're connected to Aptos Testnet, not Mainnet, for testing purposes.
          </div>
        </div>
      )
    },
    {
      title: 'Connect to App',
      description: 'Connect your wallet to the warranty system',
      status: 'wait',
      icon: '🔗',
      content: (
        <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', marginTop: '16px' }}>
          <h4 style={{ marginBottom: '16px' }}>Connection Steps:</h4>
          <ul style={{ paddingLeft: '20px', textAlign: 'left' }}>
            <li>Go back to the Dashboard</li>
            <li>Click the "Connect" button in the header</li>
            <li>Your wallet will be connected automatically</li>
            <li>Verify the connection status</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '40px',
          color: 'white'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>🔗</div>
          <h1 style={{ color: 'white', marginBottom: '16px', fontSize: '36px' }}>
            Connect Your Petra Wallet
          </h1>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)' }}>
            Follow these steps to connect your Petra wallet to the warranty management system
          </p>
        </div>
      </div>

      {/* Setup Progress */}
      <div style={{ 
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ⚡ Setup Progress
        </h2>
        <div style={{ 
          background: '#f0f0f0', 
          borderRadius: '12px', 
          height: '8px', 
          marginBottom: '16px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            background: 'linear-gradient(90deg, #1890ff, #52c41a)',
            height: '100%',
            width: `${(currentStep / 4) * 100}%`,
            transition: 'width 0.3s ease',
            borderRadius: '12px'
          }} />
        </div>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Step {currentStep} of 4
        </p>
      </div>

      {/* Setup Steps */}
      <div style={{ 
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '24px' }}>Setup Instructions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #f0f0f0',
                borderRadius: '12px',
                padding: '20px',
                background: currentStep === index + 1 ? '#f6ffed' : 'white',
                borderLeft: currentStep === index + 1 ? '4px solid #52c41a' : '1px solid #f0f0f0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ fontSize: '24px' }}>{step.icon}</div>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{step.title}</h3>
                  <p style={{ margin: 0, color: '#666' }}>{step.description}</p>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <span style={{ 
                    background: step.status === 'finish' ? '#52c41a' : 
                               step.status === 'process' ? '#1890ff' : '#d9d9d9',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}>
                    {step.status === 'finish' ? '✓' : step.status === 'process' ? '●' : '○'}
                  </span>
                </div>
              </div>
              
              {/* Step Content */}
              {currentStep === index + 1 && step.content}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ 
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '24px' }}>Ready to Connect?</h2>
        <p style={{ marginBottom: '24px', color: '#666' }}>
          Once you've completed the setup steps above, go back to the dashboard to connect your wallet.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
            color: 'white',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '24px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginRight: '16px'
          }}
        >
          Go to Dashboard
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(currentStep + 1, 4))}
          style={{
            background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
            color: 'white',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '24px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Next Step
        </button>
      </div>

      {/* Network Information */}
      <div style={{ 
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '24px' }}>Network Requirements</h2>
        <div style={{ 
          background: '#fff7e6', 
          border: '1px solid #ffd591', 
          borderRadius: '8px', 
          padding: '16px', 
          marginBottom: '20px'
        }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#d46b08' }}>⚠️ Aptos Testnet Required</h4>
          <p style={{ margin: 0, color: '#d46b08' }}>
            This application is currently configured for Aptos Testnet. Make sure your wallet is connected to the correct network.
          </p>
        </div>
        
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '12px' 
        }}>
          <h4 style={{ marginBottom: '16px' }}>Network Configuration</h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px' 
          }}>
            <div style={{ padding: '12px', background: 'white', borderRadius: '8px' }}>
              <strong>Network Name:</strong> Aptos Testnet
            </div>
            <div style={{ padding: '12px', background: 'white', borderRadius: '8px' }}>
              <strong>RPC URL:</strong> https://fullnode.testnet.aptoslabs.com/v1
            </div>
            <div style={{ padding: '12px', background: 'white', borderRadius: '8px' }}>
              <strong>Chain ID:</strong> 2
            </div>
            <div style={{ padding: '12px', background: 'white', borderRadius: '8px' }}>
              <strong>Currency Symbol:</strong> APT
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div style={{ 
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '24px' }}>Troubleshooting</h2>
        <div style={{ 
          background: '#e6f7ff', 
          border: '1px solid #91d5ff', 
          borderRadius: '8px', 
          padding: '16px', 
          marginBottom: '20px'
        }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#1890ff' }}>ℹ️ Common Issues</h4>
          <p style={{ margin: 0, color: '#1890ff' }}>
            If you're having trouble connecting your wallet, try these solutions:
          </p>
        </div>
        
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '12px' 
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '16px' 
          }}>
            <div style={{ padding: '16px', background: 'white', borderRadius: '8px', height: '100%' }}>
              <h5 style={{ margin: '0 0 8px 0' }}>Wallet Not Detected</h5>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                Make sure Petra wallet extension is installed and enabled in your browser
              </p>
            </div>
            <div style={{ padding: '16px', background: 'white', borderRadius: '8px', height: '100%' }}>
              <h5 style={{ margin: '0 0 8px 0' }}>Wrong Network</h5>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                Ensure your wallet is connected to Aptos Testnet, not Mainnet
              </p>
            </div>
            <div style={{ padding: '16px', background: 'white', borderRadius: '8px', height: '100%' }}>
              <h5 style={{ margin: '0 0 8px 0' }}>Connection Failed</h5>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                Try refreshing the page and reconnecting your wallet
              </p>
            </div>
            <div style={{ padding: '16px', background: 'white', borderRadius: '8px', height: '100%' }}>
              <h5 style={{ margin: '0 0 8px 0' }}>Permission Denied</h5>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                Check if you've approved the connection in your wallet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;
