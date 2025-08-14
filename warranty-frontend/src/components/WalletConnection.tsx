import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';

const WalletConnection: React.FC = () => {
  const { isConnected, address, connect, disconnect, userRole } = useWallet();
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debug logging
  useEffect(() => {
    console.log('WalletConnection render:', { isConnected, address, userRole });
  }, [isConnected, address, userRole]);

  const handleConnect = async () => {
    console.log('Attempting to connect wallet...');
    setIsConnecting(true);
    setError(null);
    
    try {
      await connect();
      setShowConnectModal(false);
      console.log('Wallet connected successfully');
    } catch (err: any) {
      console.error('Wallet connection failed:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    console.log('Disconnecting wallet...');
    disconnect();
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin': return '👑 Admin';
      case 'company': return '🏢 Company';
      case 'seller': return '🏪 Seller';
      case 'service_center': return '🔧 Service Center';
      case 'customer': return '👤 Customer';
      default: return '👤 User';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return '#eb2f96';
      case 'company': return '#1890ff';
      case 'seller': return '#52c41a';
      case 'service_center': return '#fa8c16';
      case 'customer': return '#722ed1';
      default: return '#666';
    }
  };

  const shortenAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        padding: '8px 16px', 
        background: 'rgba(255,255,255,0.1)', 
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.3)'
      }}>
        <div style={{ 
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          background: '#52c41a' 
        }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)' }}>
            {shortenAddress(address || '')}
          </span>
          {userRole && (
            <span style={{ 
              fontSize: '10px', 
              color: getRoleColor(userRole),
              fontWeight: 'bold'
            }}>
              {getRoleDisplayName(userRole)}
            </span>
          )}
        </div>
        
        <button
          onClick={handleDisconnect}
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
          }}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowConnectModal(true)}
        style={{
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.3)',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          cursor: 'pointer',
          transition: 'all 0.3s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
        }}
      >
        🔗 Connect Wallet
      </button>

      {/* Connect Modal */}
      {showConnectModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '32px',
            borderRadius: '20px',
            maxWidth: '500px',
            width: '90%',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🔗</div>
            <h2 style={{ marginBottom: '16px', color: '#1890ff' }}>
              Connect Your Petra Wallet
            </h2>
            <p style={{ marginBottom: '24px', color: '#666', lineHeight: '1.6' }}>
              Connect your Petra wallet to access the warranty management system. 
              Make sure you have the Petra wallet extension installed in your browser.
            </p>

            {error && (
              <div style={{
                background: '#fff2f0',
                border: '1px solid #ffccc7',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '20px',
                color: '#ff4d4f'
              }}>
                ⚠️ {error}
              </div>
            )}

            <div style={{ 
              background: '#f6ffed', 
              border: '1px solid #b7eb8f',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              textAlign: 'left'
            }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#52c41a' }}>📋 Requirements:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#666' }}>
                <li>Petra wallet extension installed</li>
                <li>Wallet unlocked and ready</li>
                <li>Connected to Aptos Testnet</li>
                <li>Account with some test APT tokens</li>
              </ul>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => setShowConnectModal(false)}
                style={{
                  background: '#f0f0f0',
                  color: '#666',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                style={{
                  background: isConnecting ? '#d9d9d9' : '#1890ff',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: isConnecting ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {isConnecting ? '🔄 Connecting...' : '🔗 Connect Wallet'}
              </button>
            </div>

            <div style={{ 
              marginTop: '20px',
              padding: '16px',
              background: '#f8f9fa',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#666'
            }}>
              <strong>💡 Tip:</strong> If you don't have Petra wallet installed, 
              <a 
                href="https://petra.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#1890ff', textDecoration: 'none', marginLeft: '4px' }}
              >
                click here to install it
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletConnection;
