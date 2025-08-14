import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const roleCards = [
    {
      title: 'Company Portal',
      description: 'Manage products, mint warranties, and track inventory',
      path: '/company',
      gradient: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
      features: ['Product Management', 'Warranty Minting', 'Inventory Tracking']
    },
    {
      title: 'Seller Portal',
      description: 'Sell products, manage inventory, and track performance',
      path: '/seller',
      gradient: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
      features: ['Sales Management', 'Performance Analytics', 'Reputation System']
    },
    {
      title: 'Customer Portal',
      description: 'View warranties, transfer tokens, and verify validity',
      path: '/customer',
      gradient: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)',
      features: ['Warranty Viewing', 'Token Transfer', 'Verification Tools']
    },
    {
      title: 'Service Center',
      description: 'Verify warranties and extend coverage periods',
      path: '/service-center',
      gradient: 'linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%)',
      features: ['Warranty Verification', 'Extension Services', 'Customer Support']
    },
    {
      title: 'Admin Portal',
      description: 'Manage system roles, verify companies, and oversee operations',
      path: '/admin',
      gradient: 'linear-gradient(135deg, #eb2f96 0%, #f759ab 100%)',
      features: ['Role Management', 'Company Verification', 'System Oversight']
    }
  ];

  return (
    <div>
      {/* Welcome Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '32px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '16px', margin: '0 0 16px 0' }}>
          🎉 Welcome to the Warranty System
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '24px', margin: '0 0 24px 0' }}>
          Next-generation warranty management system powered by Aptos blockchain
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span style={{ 
            background: 'rgba(255,255,255,0.2)', 
            padding: '8px 16px', 
            borderRadius: '20px',
            fontSize: '14px'
          }}>
            ✅ System Ready
          </span>
          <span style={{ 
            background: 'rgba(255,255,255,0.2)', 
            padding: '8px 16px', 
            borderRadius: '20px',
            fontSize: '14px'
          }}>
            🌐 Aptos Testnet
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '16px', 
        marginBottom: '32px' 
      }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>1,250</h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Total Products</p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>890</h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Active Warranties</p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>45</h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Verified Companies</p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>23</h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Service Centers</p>
        </div>
      </div>

      {/* Role Selection */}
      <h2 style={{ marginBottom: '24px', fontSize: '28px' }}>
        ⭐ Select Your Role
      </h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px' 
      }}>
        {roleCards.map((role, index) => (
          <div
            key={index}
            style={{
              borderRadius: '16px',
              border: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }}
            onClick={() => navigate(role.path)}
          >
            <div style={{ 
              background: role.gradient,
              padding: '24px',
              textAlign: 'center',
              color: 'white'
            }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '20px' }}>
                {role.title}
              </h3>
              <p style={{ margin: '0 0 20px 0', opacity: 0.9 }}>
                {role.description}
              </p>
            </div>
            
            <div style={{ padding: '24px', background: 'white' }}>
              <div style={{ marginBottom: '20px' }}>
                <strong>Key Features:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
                  {role.features.map((feature, idx) => (
                    <li key={idx} style={{ marginBottom: '4px', color: '#666' }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                style={{ 
                  width: '100%',
                  height: '48px',
                  borderRadius: '24px',
                  background: role.gradient,
                  border: 'none',
                  fontSize: '16px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s'
                }}
              >
                Access Portal
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* System Info */}
      <div style={{ 
        marginTop: '32px', 
        backgroundColor: '#f8f9fa',
        borderRadius: '16px',
        border: '1px solid #e9ecef',
        padding: '24px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '20px' }}>
          🏆 System Information
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px' 
        }}>
          <div>
            <strong>Network:</strong> Aptos Testnet
          </div>
          <div>
            <strong>Contract Address:</strong> 0x1948138c42b20f0c589f1861c589bc6b09943502aa6d9f5ffae278d67e5c59a3
          </div>
          <div>
            <strong>Total Supply:</strong> Unlimited
          </div>
          <div>
            <strong>Token Standard:</strong> Aptos Token Objects
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
