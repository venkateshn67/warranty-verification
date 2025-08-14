import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import WalletConnection from './WalletConnection';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected, userRole, isLoading } = useWallet();
  const [collapsed, setCollapsed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debug logging
  useEffect(() => {
    console.log('Layout render:', { isConnected, userRole, isLoading, pathname: location.pathname });
  }, [isConnected, userRole, isLoading, location.pathname]);

  const menuItems = [
    { key: '/', label: 'Dashboard', roles: ['customer', 'company', 'seller', 'service_center', 'admin'] },
    { key: '/company', label: 'Company Portal', roles: ['company', 'admin'] },
    { key: '/seller', label: 'Seller Portal', roles: ['seller', 'admin'] },
    { key: '/customer', label: 'Customer Portal', roles: ['customer', 'admin'] },
    { key: '/service-center', label: 'Service Center', roles: ['service_center', 'admin'] },
    { key: '/admin', label: 'Admin Portal', roles: ['admin'] },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => 
    !userRole || item.roles.includes(userRole)
  );

  // Error handling
  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '24px',
        textAlign: 'center'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '48px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          maxWidth: '600px'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>⚠️</div>
          <h1 style={{ marginBottom: '16px', fontSize: '28px' }}>
            Layout Error
          </h1>
          <p style={{ marginBottom: '24px', opacity: 0.9, lineHeight: '1.6' }}>
            {error}
          </p>
          <button
            onClick={() => setError(null)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'all 0.3s'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ 
        width: collapsed ? '80px' : '250px',
        background: 'linear-gradient(180deg, #fff 0%, #f8f9fa 100%)',
        borderRight: '1px solid #f0f0f0',
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        transition: 'width 0.3s'
      }}>
        <div style={{ 
          padding: '16px', 
          textAlign: 'center', 
          borderBottom: '1px solid #f0f0f0',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
        }}>
          <div style={{ 
            fontWeight: 'bold', 
            color: '#1890ff',
            fontSize: collapsed ? '14px' : '16px'
          }}>
            {collapsed ? 'WS' : 'Warranty System'}
          </div>
        </div>
        
        <div style={{ padding: '16px 0' }}>
          {filteredMenuItems.map((item) => (
            <div
              key={item.key}
              onClick={() => navigate(item.key)}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                background: location.pathname === item.key ? '#e6f7ff' : 'transparent',
                color: location.pathname === item.key ? '#1890ff' : '#333',
                borderRight: location.pathname === item.key ? '3px solid #1890ff' : 'none',
                margin: '4px 0',
                borderRadius: '0 4px 4px 0',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== item.key) {
                  e.currentTarget.style.background = '#f5f5f5';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== item.key) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {collapsed ? item.label.charAt(0) : item.label}
            </div>
          ))}
        </div>
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: collapsed ? '20px' : '220px',
            background: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, #001529 0%, #003a70 100%)',
          padding: '16px 24px',
          color: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h1 style={{ margin: 0, fontSize: '24px' }}>
            🛡️ Warranty System
          </h1>
          
          <WalletConnection />
        </div>

        {/* Content Area */}
        <div style={{ 
          flex: 1, 
          padding: '24px', 
          background: '#f0f2f5',
          overflow: 'auto'
        }}>
          {isLoading ? (
            <div style={{ 
              background: '#fff', 
              padding: '48px', 
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              border: '1px solid #f0f0f0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '24px' }}>⏳</div>
              <h2 style={{ marginBottom: '16px', color: '#1890ff' }}>
                Loading...
              </h2>
              <p style={{ marginBottom: '32px', color: '#666', fontSize: '16px' }}>
                Initializing wallet connection...
              </p>
            </div>
          ) : !isConnected ? (
            <div style={{ 
              background: '#fff', 
              padding: '48px', 
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              border: '1px solid #f0f0f0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '24px' }}>🔗</div>
              <h2 style={{ marginBottom: '16px', color: '#1890ff' }}>
                Connect Your Wallet
              </h2>
              <p style={{ marginBottom: '32px', color: '#666', fontSize: '16px' }}>
                Please connect your Petra wallet to access the warranty management system.
              </p>
              <WalletConnection />
            </div>
          ) : (
            <div style={{ 
              background: '#fff', 
              padding: '24px', 
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              border: '1px solid #f0f0f0',
              minHeight: 'calc(100vh - 200px)'
            }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
