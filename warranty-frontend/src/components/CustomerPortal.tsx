import React, { useState, useEffect } from 'react';

interface Warranty {
  id: string;
  productName: string;
  companyName: string;
  purchaseDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'transferred' | 'void';
  tokenId: string;
  coverage: string;
}

interface TokenTransfer {
  id: string;
  from: string;
  to: string;
  tokenId: string;
  date: string;
  status: 'pending' | 'completed' | 'failed';
}

const CustomerPortal: React.FC = () => {
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [transfers, setTransfers] = useState<TokenTransfer[]>([]);
  const [activeTab, setActiveTab] = useState('warranties');
  const [selectedWarranty, setSelectedWarranty] = useState<Warranty | null>(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferAddress, setTransferAddress] = useState('');

  useEffect(() => {
    // Mock data for warranties
    setWarranties([
      {
        id: 'w1',
        productName: 'Smartphone X1',
        companyName: 'TechCorp Inc.',
        purchaseDate: '2024-01-15',
        expiryDate: '2027-01-15',
        status: 'active',
        tokenId: 'NFT#001',
        coverage: '3 Years - Parts & Labor'
      },
      {
        id: 'w2',
        productName: 'Laptop Pro',
        companyName: 'Computex Ltd.',
        purchaseDate: '2023-12-01',
        expiryDate: '2026-12-01',
        status: 'active',
        tokenId: 'NFT#002',
        coverage: '3 Years - Extended Warranty'
      },
      {
        id: 'w3',
        productName: 'Smart TV 4K',
        companyName: 'VisionTech',
        purchaseDate: '2023-06-15',
        expiryDate: '2025-06-15',
        status: 'expired',
        tokenId: 'NFT#003',
        coverage: '2 Years - Standard'
      }
    ]);

    // Mock data for transfers
    setTransfers([
      {
        id: 't1',
        from: '0x1234...5678',
        to: '0x8765...4321',
        tokenId: 'NFT#001',
        date: '2024-02-01',
        status: 'completed'
      }
    ]);
  }, []);

  const handleTransfer = () => {
    if (selectedWarranty && transferAddress) {
      const newTransfer: TokenTransfer = {
        id: `t${Date.now()}`,
        from: '0x1234...5678', // Current user address
        to: transferAddress,
        tokenId: selectedWarranty.tokenId,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      setTransfers([...transfers, newTransfer]);
      setShowTransferModal(false);
      setTransferAddress('');
      setSelectedWarranty(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#52c41a';
      case 'expired': return '#ff4d4f';
      case 'transferred': return '#1890ff';
      case 'void': return '#666';
      default: return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '✅';
      case 'expired': return '⏰';
      case 'transferred': return '🔄';
      case 'void': return '❌';
      default: return '❓';
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '32px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 style={{ color: 'white', marginBottom: '16px', fontSize: '36px' }}>
          👤 Customer Portal
        </h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>
          Manage warranties, transfer tokens, and verify validity
        </p>
      </div>

      {/* Stats Overview */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px', 
        marginBottom: '32px' 
      }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>
            {warranties.filter(w => w.status === 'active').length}
          </h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Active Warranties</p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>
            {warranties.filter(w => w.status === 'expired').length}
          </h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Expired Warranties</p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>
            {transfers.filter(t => t.status === 'completed').length}
          </h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Completed Transfers</p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>
            {warranties.length}
          </h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Total Warranties</p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '24px',
          borderBottom: '1px solid #f0f0f0',
          paddingBottom: '16px'
        }}>
          <button
            onClick={() => setActiveTab('warranties')}
            style={{
              background: activeTab === 'warranties' ? '#722ed1' : 'transparent',
              color: activeTab === 'warranties' ? 'white' : '#666',
              border: '1px solid #d9d9d9',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            🛡️ My Warranties ({warranties.length})
          </button>
          <button
            onClick={() => setActiveTab('transfers')}
            style={{
              background: activeTab === 'transfers' ? '#722ed1' : 'transparent',
              color: activeTab === 'transfers' ? 'white' : '#666',
              border: '1px solid #d9d9d9',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            🔄 Token Transfers ({transfers.length})
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            style={{
              background: activeTab === 'verification' ? '#722ed1' : 'transparent',
              color: activeTab === 'verification' ? 'white' : '#666',
              border: '1px solid #d9d9d9',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            🔍 Verification Tools
          </button>
        </div>

        {/* Warranties Tab */}
        {activeTab === 'warranties' && (
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0 }}>My Warranties</h3>
              <button
                style={{
                  background: '#722ed1',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                + Add New
              </button>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '20px' 
            }}>
              {warranties.map((warranty) => (
                <div
                  key={warranty.id}
                  style={{
                    border: '1px solid #f0f0f0',
                    borderRadius: '12px',
                    padding: '20px',
                    background: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    position: 'relative'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <h4 style={{ margin: 0, color: '#722ed1' }}>{warranty.productName}</h4>
                    <span style={{ 
                      background: getStatusColor(warranty.status),
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      textTransform: 'capitalize'
                    }}>
                      {getStatusIcon(warranty.status)} {warranty.status}
                    </span>
                  </div>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <strong>Company:</strong>
                      <br />
                      {warranty.companyName}
                    </div>
                    <div>
                      <strong>Token ID:</strong>
                      <br />
                      <code style={{ fontSize: '12px', color: '#666' }}>{warranty.tokenId}</code>
                    </div>
                    <div>
                      <strong>Purchase Date:</strong>
                      <br />
                      {warranty.purchaseDate}
                    </div>
                    <div>
                      <strong>Expiry Date:</strong>
                      <br />
                      {warranty.expiryDate}
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: '#f9f0ff', 
                    padding: '12px', 
                    borderRadius: '8px',
                    border: '1px solid #d3adf7',
                    marginBottom: '16px'
                  }}>
                    <strong>Coverage:</strong> {warranty.coverage}
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px',
                    justifyContent: 'flex-end'
                  }}>
                    <button
                      onClick={() => {
                        setSelectedWarranty(warranty);
                        setShowTransferModal(true);
                      }}
                      disabled={warranty.status !== 'active'}
                      style={{
                        background: warranty.status === 'active' ? '#722ed1' : '#f0f0f0',
                        color: warranty.status === 'active' ? 'white' : '#999',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: warranty.status === 'active' ? 'pointer' : 'not-allowed',
                        fontSize: '12px'
                      }}
                    >
                      Transfer
                    </button>
                    <button
                      style={{
                        background: '#1890ff',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transfers Tab */}
        {activeTab === 'transfers' && (
          <div>
            <h3 style={{ marginBottom: '20px' }}>Token Transfer History</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '20px' 
            }}>
              {transfers.map((transfer) => (
                <div
                  key={transfer.id}
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
                    <h4 style={{ margin: 0, color: '#1890ff' }}>Transfer #{transfer.id}</h4>
                    <span style={{ 
                      background: transfer.status === 'completed' ? '#52c41a' : 
                                transfer.status === 'pending' ? '#faad14' : '#ff4d4f',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      textTransform: 'capitalize'
                    }}>
                      {transfer.status}
                    </span>
                  </div>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <strong>From:</strong>
                      <br />
                      <code style={{ fontSize: '12px', color: '#666' }}>{transfer.from}</code>
                    </div>
                    <div>
                      <strong>To:</strong>
                      <br />
                      <code style={{ fontSize: '12px', color: '#666' }}>{transfer.to}</code>
                    </div>
                    <div>
                      <strong>Token ID:</strong>
                      <br />
                      <code style={{ fontSize: '12px', color: '#666' }}>{transfer.tokenId}</code>
                    </div>
                    <div>
                      <strong>Date:</strong>
                      <br />
                      {transfer.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verification Tab */}
        {activeTab === 'verification' && (
          <div>
            <h3 style={{ marginBottom: '20px' }}>Warranty Verification Tools</h3>
            
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
                <h4 style={{ margin: '0 0 16px 0', color: '#722ed1' }}>🔍 Verify by Token ID</h4>
                <input
                  type="text"
                  placeholder="Enter NFT Token ID"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '8px',
                    marginBottom: '12px'
                  }}
                />
                <button
                  style={{
                    background: '#722ed1',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  Verify Warranty
                </button>
              </div>
              
              <div style={{
                border: '1px solid #f0f0f0',
                borderRadius: '12px',
                padding: '20px',
                background: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h4 style={{ margin: '0 0 16px 0', color: '#1890ff' }}>📱 QR Code Scanner</h4>
                <div style={{ 
                  background: '#f0f0f0',
                  height: '120px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666',
                  fontSize: '14px',
                  marginBottom: '12px'
                }}>
                  📷 Camera Access Required
                </div>
                <button
                  style={{
                    background: '#1890ff',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  Scan QR Code
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transfer Modal */}
      {showTransferModal && selectedWarranty && (
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
            borderRadius: '16px',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#722ed1' }}>
              Transfer Warranty Token
            </h3>
            <p style={{ marginBottom: '16px', color: '#666' }}>
              Transfer <strong>{selectedWarranty.productName}</strong> warranty to another address
            </p>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Recipient Address:
              </label>
              <input
                type="text"
                placeholder="0x..."
                value={transferAddress}
                onChange={(e) => setTransferAddress(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '12px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setShowTransferModal(false)}
                style={{
                  background: '#f0f0f0',
                  color: '#666',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleTransfer}
                disabled={!transferAddress}
                style={{
                  background: transferAddress ? '#722ed1' : '#f0f0f0',
                  color: transferAddress ? 'white' : '#999',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: transferAddress ? 'pointer' : 'not-allowed'
                }}
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPortal;
