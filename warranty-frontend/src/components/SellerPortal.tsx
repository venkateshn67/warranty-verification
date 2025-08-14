import React, { useState, useEffect } from 'react';

interface Sale {
  id: string;
  productName: string;
  customerAddress: string;
  saleDate: string;
  price: number;
  commission: number;
  status: 'completed' | 'pending' | 'cancelled';
}

interface Performance {
  totalSales: number;
  totalRevenue: number;
  totalCommission: number;
  averageRating: number;
}

const SellerPortal: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [performance, setPerformance] = useState<Performance>({
    totalSales: 0,
    totalRevenue: 0,
    totalCommission: 0,
    averageRating: 4.7
  });
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    setSales([
      {
        id: 's1',
        productName: 'Smartphone X1',
        customerAddress: '0x1234...5678',
        saleDate: '2024-01-15',
        price: 999.99,
        commission: 99.99,
        status: 'completed'
      },
      {
        id: 's2',
        productName: 'Laptop Pro',
        customerAddress: '0x8765...4321',
        saleDate: '2024-02-01',
        price: 1499.99,
        commission: 149.99,
        status: 'completed'
      }
    ]);

    setPerformance({
      totalSales: 2,
      totalRevenue: 2499.98,
      totalCommission: 249.98,
      averageRating: 4.7
    });
  }, []);

  return (
    <div>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '32px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 style={{ color: 'white', marginBottom: '16px', fontSize: '36px' }}>
          🏪 Seller Portal
        </h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>
          Manage sales, track performance, and grow your business
        </p>
      </div>

      {/* Performance Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px', 
        marginBottom: '32px' 
      }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>{performance.totalSales}</h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Total Sales</p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>${performance.totalRevenue.toLocaleString()}</h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Total Revenue</p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>${performance.totalCommission.toLocaleString()}</h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Total Commission</p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>{performance.averageRating}⭐</h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Average Rating</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ 
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '24px',
          borderBottom: '1px solid #f0f0f0',
          paddingBottom: '16px'
        }}>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              background: activeTab === 'dashboard' ? '#52c41a' : 'transparent',
              color: activeTab === 'dashboard' ? 'white' : '#666',
              border: '1px solid #d9d9d9',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            style={{
              background: activeTab === 'sales' ? '#52c41a' : 'transparent',
              color: activeTab === 'sales' ? 'white' : '#666',
              border: '1px solid #d9d9d9',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            💰 Sales ({sales.length})
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <h3 style={{ marginBottom: '20px' }}>Performance Overview</h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px',
              marginBottom: '32px'
            }}>
              <div style={{
                border: '1px solid #f0f0f0',
                borderRadius: '12px',
                padding: '20px',
                background: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h4 style={{ margin: '0 0 16px 0', color: '#52c41a' }}>Sales Trend</h4>
                <div style={{ 
                  background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
                  height: '120px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  📈 +15% This Month
                </div>
              </div>
              
              <div style={{
                border: '1px solid #f0f0f0',
                borderRadius: '12px',
                padding: '20px',
                background: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h4 style={{ margin: '0 0 16px 0', color: '#1890ff' }}>Customer Satisfaction</h4>
                <div style={{ 
                  background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
                  height: '120px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  😊 92%
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sales Tab */}
        {activeTab === 'sales' && (
          <div>
            <h3 style={{ marginBottom: '20px' }}>Sales History</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '20px' 
            }}>
              {sales.map((sale) => (
                <div
                  key={sale.id}
                  style={{
                    border: '1px solid #f0f0f0',
                    borderRadius: '12px',
                    padding: '20px',
                    background: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <h4 style={{ margin: 0, color: '#52c41a' }}>{sale.productName}</h4>
                    <span style={{ 
                      background: sale.status === 'completed' ? '#52c41a' : '#faad14',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      textTransform: 'capitalize'
                    }}>
                      {sale.status}
                    </span>
                  </div>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <strong>Sale ID:</strong>
                      <br />
                      <code style={{ fontSize: '12px', color: '#666' }}>{sale.id}</code>
                    </div>
                    <div>
                      <strong>Customer:</strong>
                      <br />
                      <code style={{ fontSize: '12px', color: '#666' }}>{sale.customerAddress}</code>
                    </div>
                    <div>
                      <strong>Sale Date:</strong>
                      <br />
                      {sale.saleDate}
                    </div>
                    <div>
                      <strong>Price:</strong>
                      <br />
                      ${sale.price}
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: '#f6ffed', 
                    padding: '12px', 
                    borderRadius: '8px',
                    border: '1px solid #b7eb8f',
                    textAlign: 'center'
                  }}>
                    <strong>Commission Earned:</strong> ${sale.commission}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerPortal;
