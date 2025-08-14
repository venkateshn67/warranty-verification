import React, { useState, useEffect } from 'react';

interface ServiceRequest {
  id: string;
  customerName: string;
  productName: string;
  warrantyTokenId: string;
  issue: string;
  requestDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface WarrantyVerification {
  id: string;
  tokenId: string;
  customerAddress: string;
  productName: string;
  companyName: string;
  expiryDate: string;
  isValid: boolean;
  verificationDate: string;
}

interface ExtensionRequest {
  id: string;
  customerName: string;
  productName: string;
  currentExpiry: string;
  requestedExtension: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
}

const ServiceCenterPortal: React.FC = () => {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [verifications, setVerifications] = useState<WarrantyVerification[]>([]);
  const [extensions, setExtensions] = useState<ExtensionRequest[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [verificationTokenId, setVerificationTokenId] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationResult, setVerificationResult] = useState<WarrantyVerification | null>(null);

  useEffect(() => {
    // Mock data for service requests
    setServiceRequests([
      {
        id: 'sr1',
        customerName: 'John Doe',
        productName: 'Smartphone X1',
        warrantyTokenId: 'NFT#001',
        issue: 'Screen not responding to touch',
        requestDate: '2024-02-01',
        status: 'in_progress',
        priority: 'high'
      },
      {
        id: 'sr2',
        customerName: 'Jane Smith',
        productName: 'Laptop Pro',
        warrantyTokenId: 'NFT#002',
        issue: 'Battery not charging',
        requestDate: '2024-01-28',
        status: 'pending',
        priority: 'medium'
      }
    ]);

    // Mock data for verifications
    setVerifications([
      {
        id: 'v1',
        tokenId: 'NFT#001',
        customerAddress: '0x1234...5678',
        productName: 'Smartphone X1',
        companyName: 'TechCorp Inc.',
        expiryDate: '2027-01-15',
        isValid: true,
        verificationDate: '2024-02-01'
      }
    ]);

    // Mock data for extensions
    setExtensions([
      {
        id: 'ex1',
        customerName: 'Mike Johnson',
        productName: 'Smart TV 4K',
        currentExpiry: '2025-06-15',
        requestedExtension: '2026-06-15',
        reason: 'Product in excellent condition, customer wants extended coverage',
        status: 'pending',
        requestDate: '2024-01-30'
      }
    ]);
  }, []);

  const handleVerification = () => {
    if (verificationTokenId) {
      // Mock verification logic
      const mockResult: WarrantyVerification = {
        id: `v${Date.now()}`,
        tokenId: verificationTokenId,
        customerAddress: '0x8765...4321',
        productName: 'Sample Product',
        companyName: 'Sample Company',
        expiryDate: '2026-12-31',
        isValid: Math.random() > 0.3, // 70% chance of being valid
        verificationDate: new Date().toISOString().split('T')[0]
      };
      
      setVerificationResult(mockResult);
      setVerifications([...verifications, mockResult]);
      setShowVerificationModal(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#faad14';
      case 'in_progress': return '#1890ff';
      case 'completed': return '#52c41a';
      case 'cancelled': return '#ff4d4f';
      default: return '#666';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return '#52c41a';
      case 'medium': return '#faad14';
      case 'high': return '#ff4d4f';
      case 'urgent': return '#eb2f96';
      default: return '#666';
    }
  };

  const getExtensionStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#faad14';
      case 'approved': return '#52c41a';
      case 'rejected': return '#ff4d4f';
      default: return '#666';
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '32px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 style={{ color: 'white', marginBottom: '16px', fontSize: '36px' }}>
          🔧 Service Center Portal
        </h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>
          Verify warranties, manage service requests, and extend coverage periods
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
          background: 'linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>
            {serviceRequests.filter(sr => sr.status === 'pending').length}
          </h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Pending Requests</p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>
            {serviceRequests.filter(sr => sr.status === 'in_progress').length}
          </h3>
          <p style={{ margin: 0, opacity: 0.9 }}>In Progress</p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>
            {verifications.length}
          </h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Verifications</p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>
            {extensions.filter(ex => ex.status === 'pending').length}
          </h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Extension Requests</p>
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
          paddingBottom: '16px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              background: activeTab === 'dashboard' ? '#fa8c16' : 'transparent',
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
            onClick={() => setActiveTab('verification')}
            style={{
              background: activeTab === 'verification' ? '#fa8c16' : 'transparent',
              color: activeTab === 'verification' ? 'white' : '#666',
              border: '1px solid #d9d9d9',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            🔍 Warranty Verification
          </button>
          <button
            onClick={() => setActiveTab('service')}
            style={{
              background: activeTab === 'service' ? '#fa8c16' : 'transparent',
              color: activeTab === 'service' ? 'white' : '#666',
              border: '1px solid #d9d9d9',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            🛠️ Service Requests ({serviceRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('extensions')}
            style={{
              background: activeTab === 'extensions' ? '#fa8c16' : 'transparent',
              color: activeTab === 'extensions' ? 'white' : '#666',
              border: '1px solid #d9d9d9',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            ⏰ Extensions ({extensions.length})
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <h3 style={{ marginBottom: '20px' }}>Service Center Overview</h3>
            
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
                <h4 style={{ margin: '0 0 16px 0', color: '#fa8c16' }}>Quick Verification</h4>
                <input
                  type="text"
                  placeholder="Enter NFT Token ID"
                  value={verificationTokenId}
                  onChange={(e) => setVerificationTokenId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '8px',
                    marginBottom: '12px'
                  }}
                />
                <button
                  onClick={handleVerification}
                  disabled={!verificationTokenId}
                  style={{
                    background: verificationTokenId ? '#fa8c16' : '#f0f0f0',
                    color: verificationTokenId ? 'white' : '#999',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: verificationTokenId ? 'pointer' : 'not-allowed',
                    width: '100%'
                  }}
                >
                  Verify Now
                </button>
              </div>
              
              <div style={{
                border: '1px solid #f0f0f0',
                borderRadius: '12px',
                padding: '20px',
                background: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h4 style={{ margin: '0 0 16px 0', color: '#1890ff' }}>Recent Activity</h4>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  <div style={{ marginBottom: '8px' }}>• 2 new service requests</div>
                  <div style={{ marginBottom: '8px' }}>• 1 warranty verification</div>
                  <div style={{ marginBottom: '8px' }}>• 1 extension request</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Verification Tab */}
        {activeTab === 'verification' && (
          <div>
            <h3 style={{ marginBottom: '20px' }}>Warranty Verification History</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '20px' 
            }}>
              {verifications.map((verification) => (
                <div
                  key={verification.id}
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
                    <h4 style={{ margin: 0, color: '#1890ff' }}>Token: {verification.tokenId}</h4>
                    <span style={{ 
                      background: verification.isValid ? '#52c41a' : '#ff4d4f',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>
                      {verification.isValid ? '✅ Valid' : '❌ Invalid'}
                    </span>
                  </div>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <strong>Product:</strong>
                      <br />
                      {verification.productName}
                    </div>
                    <div>
                      <strong>Company:</strong>
                      <br />
                      {verification.companyName}
                    </div>
                    <div>
                      <strong>Customer:</strong>
                      <br />
                      <code style={{ fontSize: '12px', color: '#666' }}>{verification.customerAddress}</code>
                    </div>
                    <div>
                      <strong>Expiry:</strong>
                      <br />
                      {verification.expiryDate}
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: verification.isValid ? '#f6ffed' : '#fff2f0', 
                    padding: '12px', 
                    borderRadius: '8px',
                    border: `1px solid ${verification.isValid ? '#b7eb8f' : '#ffccc7'}`,
                    textAlign: 'center',
                    fontSize: '14px'
                  }}>
                    <strong>Verification Date:</strong> {verification.verificationDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Service Requests Tab */}
        {activeTab === 'service' && (
          <div>
            <h3 style={{ marginBottom: '20px' }}>Service Requests</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '20px' 
            }}>
              {serviceRequests.map((request) => (
                <div
                  key={request.id}
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
                    <h4 style={{ margin: 0, color: '#fa8c16' }}>Request #{request.id}</h4>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ 
                        background: getStatusColor(request.status),
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        textTransform: 'capitalize'
                      }}>
                        {request.status.replace('_', ' ')}
                      </span>
                      <span style={{ 
                        background: getPriorityColor(request.priority),
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        textTransform: 'capitalize'
                      }}>
                        {request.priority}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <strong>Customer:</strong>
                      <br />
                      {request.customerName}
                    </div>
                    <div>
                      <strong>Product:</strong>
                      <br />
                      {request.productName}
                    </div>
                    <div>
                      <strong>Warranty Token:</strong>
                      <br />
                      <code style={{ fontSize: '12px', color: '#666' }}>{request.warrantyTokenId}</code>
                    </div>
                    <div>
                      <strong>Request Date:</strong>
                      <br />
                      {request.requestDate}
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: '#f9f9f9', 
                    padding: '12px', 
                    borderRadius: '8px',
                    border: '1px solid #f0f0f0',
                    marginBottom: '16px'
                  }}>
                    <strong>Issue:</strong> {request.issue}
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px',
                    justifyContent: 'flex-end'
                  }}>
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
                      Update Status
                    </button>
                    <button
                      style={{
                        background: '#52c41a',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Contact Customer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Extensions Tab */}
        {activeTab === 'extensions' && (
          <div>
            <h3 style={{ marginBottom: '20px' }}>Warranty Extension Requests</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '20px' 
            }}>
              {extensions.map((extension) => (
                <div
                  key={extension.id}
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
                    <h4 style={{ margin: 0, color: '#722ed1' }}>Extension #{extension.id}</h4>
                    <span style={{ 
                      background: getExtensionStatusColor(extension.status),
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      textTransform: 'capitalize'
                    }}>
                      {extension.status}
                    </span>
                  </div>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <strong>Customer:</strong>
                      <br />
                      {extension.customerName}
                    </div>
                    <div>
                      <strong>Product:</strong>
                      <br />
                      {extension.productName}
                    </div>
                    <div>
                      <strong>Current Expiry:</strong>
                      <br />
                      {extension.currentExpiry}
                    </div>
                    <div>
                      <strong>Requested Extension:</strong>
                      <br />
                      {extension.requestedExtension}
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: '#f9f0ff', 
                    padding: '12px', 
                    borderRadius: '8px',
                    border: '1px solid #d3adf7',
                    marginBottom: '16px'
                  }}>
                    <strong>Reason:</strong> {extension.reason}
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px',
                    justifyContent: 'flex-end'
                  }}>
                    {extension.status === 'pending' && (
                      <>
                        <button
                          style={{
                            background: '#52c41a',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Approve
                        </button>
                        <button
                          style={{
                            background: '#ff4d4f',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Reject
                        </button>
                      </>
                    )}
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
      </div>

      {/* Verification Result Modal */}
      {showVerificationModal && verificationResult && (
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
            <h3 style={{ marginBottom: '20px', color: '#fa8c16' }}>
              Warranty Verification Result
            </h3>
            
            <div style={{ 
              background: verificationResult.isValid ? '#f6ffed' : '#fff2f0',
              padding: '20px',
              borderRadius: '12px',
              border: `2px solid ${verificationResult.isValid ? '#52c41a' : '#ff4d4f'}`,
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                {verificationResult.isValid ? '✅' : '❌'}
              </div>
              <h4 style={{ 
                margin: '0 0 8px 0', 
                color: verificationResult.isValid ? '#52c41a' : '#ff4d4f' 
              }}>
                {verificationResult.isValid ? 'Warranty is VALID' : 'Warranty is INVALID'}
              </h4>
              <p style={{ margin: 0, color: '#666' }}>
                Token ID: {verificationResult.tokenId}
              </p>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '12px' 
              }}>
                <div>
                  <strong>Product:</strong>
                  <br />
                  {verificationResult.productName}
                </div>
                <div>
                  <strong>Company:</strong>
                  <br />
                  {verificationResult.companyName}
                </div>
                <div>
                  <strong>Customer:</strong>
                  <br />
                  <code style={{ fontSize: '12px', color: '#666' }}>
                    {verificationResult.customerAddress}
                  </code>
                </div>
                <div>
                  <strong>Expiry Date:</strong>
                  <br />
                  {verificationResult.expiryDate}
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => setShowVerificationModal(false)}
                style={{
                  background: '#fa8c16',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCenterPortal;
