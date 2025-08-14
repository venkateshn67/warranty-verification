import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'company' | 'seller' | 'service_center' | 'customer';
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  lastLogin: string;
}

interface Company {
  id: string;
  name: string;
  address: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  documents: string[];
  requestDate: string;
  adminNotes: string;
}

interface SystemMetric {
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

interface RolePermission {
  role: string;
  permissions: string[];
  canManageUsers: boolean;
  canVerifyCompanies: boolean;
  canViewAnalytics: boolean;
  canManageSystem: boolean;
}

const AdminPortal: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data for users
    setUsers([
      {
        id: 'u1',
        username: 'admin_user',
        email: 'admin@warranty.com',
        role: 'admin',
        status: 'active',
        joinDate: '2023-01-01',
        lastLogin: '2024-02-01'
      },
      {
        id: 'u2',
        username: 'techcorp_admin',
        email: 'admin@techcorp.com',
        role: 'company',
        status: 'active',
        joinDate: '2023-02-15',
        lastLogin: '2024-01-30'
      },
      {
        id: 'u3',
        username: 'seller_john',
        email: 'john@seller.com',
        role: 'seller',
        status: 'active',
        joinDate: '2023-03-01',
        lastLogin: '2024-01-28'
      },
      {
        id: 'u4',
        username: 'service_center_1',
        email: 'service@repair.com',
        role: 'service_center',
        status: 'pending',
        joinDate: '2024-01-15',
        lastLogin: 'Never'
      }
    ]);

    // Mock data for companies
    setCompanies([
      {
        id: 'c1',
        name: 'TechCorp Inc.',
        address: '123 Tech Street, Silicon Valley, CA',
        verificationStatus: 'verified',
        documents: ['Business License', 'Tax Certificate', 'Insurance Policy'],
        requestDate: '2023-02-15',
        adminNotes: 'All documents verified. Company is legitimate and well-established.'
      },
      {
        id: 'c2',
        name: 'NewTech Solutions',
        address: '456 Innovation Ave, Austin, TX',
        verificationStatus: 'pending',
        documents: ['Business License', 'Tax Certificate'],
        requestDate: '2024-01-20',
        adminNotes: 'Pending insurance policy verification.'
      },
      {
        id: 'c3',
        name: 'Startup Electronics',
        address: '789 Startup Blvd, Seattle, WA',
        verificationStatus: 'rejected',
        documents: ['Business License'],
        requestDate: '2024-01-10',
        adminNotes: 'Insufficient documentation. Missing tax certificate and insurance.'
      }
    ]);
  }, []);

  const handleCompanyVerification = (companyId: string, status: 'verified' | 'rejected') => {
    setCompanies(companies.map(company => 
      company.id === companyId 
        ? { ...company, verificationStatus: status, adminNotes }
        : company
    ));
    setShowCompanyModal(false);
    setAdminNotes('');
    setSelectedCompany(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#52c41a';
      case 'pending': return '#faad14';
      case 'suspended': return '#ff4d4f';
      case 'rejected': return '#ff4d4f';
      case 'verified': return '#52c41a';
      default: return '#666';
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

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return '#52c41a';
      case 'pending': return '#faad14';
      case 'rejected': return '#ff4d4f';
      default: return '#666';
    }
  };

  const systemMetrics: SystemMetric[] = [
    { name: 'Total Users', value: 1247, change: 12, trend: 'up' },
    { name: 'Active Companies', value: 89, change: 5, trend: 'up' },
    { name: 'Total Warranties', value: 5678, change: 234, trend: 'up' },
    { name: 'System Uptime', value: 99.9, change: 0.1, trend: 'stable' }
  ];

  const rolePermissions: RolePermission[] = [
    {
      role: 'admin',
      permissions: ['Full System Access', 'User Management', 'Company Verification', 'System Analytics'],
      canManageUsers: true,
      canVerifyCompanies: true,
      canViewAnalytics: true,
      canManageSystem: true
    },
    {
      role: 'company',
      permissions: ['Warranty Management', 'Customer Support', 'Analytics'],
      canManageUsers: false,
      canVerifyCompanies: false,
      canViewAnalytics: true,
      canManageSystem: false
    },
    {
      role: 'seller',
      permissions: ['Sales Management', 'Commission Tracking'],
      canManageUsers: false,
      canVerifyCompanies: false,
      canViewAnalytics: false,
      canManageSystem: false
    }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #eb2f96 0%, #f759ab 100%)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '32px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 style={{ color: 'white', marginBottom: '16px', fontSize: '36px' }}>
          ⚙️ Admin Portal
        </h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>
          Manage system roles, verify companies, and oversee operations
        </p>
      </div>

      {/* Stats Overview */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px', 
        marginBottom: '32px' 
      }}>
        {systemMetrics.map((metric, index) => (
          <div key={index} style={{ 
            background: 'linear-gradient(135deg, #eb2f96 0%, #f759ab 100%)',
            padding: '24px',
            borderRadius: '16px',
            color: 'white',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>
              {metric.name === 'System Uptime' ? `${metric.value}%` : metric.value.toLocaleString()}
            </h3>
            <p style={{ margin: 0, opacity: 0.9 }}>{metric.name}</p>
            <div style={{ 
              marginTop: '8px', 
              fontSize: '14px',
              opacity: 0.9
            }}>
              {metric.trend === 'up' ? '↗️' : metric.trend === 'down' ? '↘️' : '→'} 
              {metric.change > 0 ? '+' : ''}{metric.change}%
            </div>
          </div>
        ))}
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
              background: activeTab === 'dashboard' ? '#eb2f96' : 'transparent',
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
            onClick={() => setActiveTab('users')}
            style={{
              background: activeTab === 'users' ? '#eb2f96' : 'transparent',
              color: activeTab === 'users' ? 'white' : '#666',
              border: '1px solid #d9d9d9',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            👥 User Management ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            style={{
              background: activeTab === 'companies' ? '#eb2f96' : 'transparent',
              color: activeTab === 'companies' ? 'white' : '#666',
              border: '1px solid #d9d9d9',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            🏢 Company Verification ({companies.length})
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            style={{
              background: activeTab === 'roles' ? '#eb2f96' : 'transparent',
              color: activeTab === 'roles' ? 'white' : '#666',
              border: '1px solid #d9d9d9',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            🔐 Role Management
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <h3 style={{ marginBottom: '20px' }}>System Overview</h3>
            
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
                <h4 style={{ margin: '0 0 16px 0', color: '#eb2f96' }}>Quick Actions</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    onClick={() => setActiveTab('users')}
                    style={{
                      background: '#eb2f96',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    👥 Manage Users
                  </button>
                  <button
                    onClick={() => setActiveTab('companies')}
                    style={{
                      background: '#1890ff',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    🏢 Verify Companies
                  </button>
                  <button
                    style={{
                      background: '#52c41a',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    📊 View Analytics
                  </button>
                </div>
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
                  <div style={{ marginBottom: '8px' }}>• 2 new company verification requests</div>
                  <div style={{ marginBottom: '8px' }}>• 5 new user registrations</div>
                  <div style={{ marginBottom: '8px' }}>• System backup completed</div>
                  <div style={{ marginBottom: '8px' }}>• Security audit scheduled</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0 }}>User Management</h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '8px',
                    width: '200px'
                  }}
                />
                <button
                  style={{
                    background: '#eb2f96',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  + Add User
                </button>
              </div>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '20px' 
            }}>
              {users
                .filter(user => 
                  user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.role.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                <div
                  key={user.id}
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
                    <h4 style={{ margin: 0, color: '#eb2f96' }}>{user.username}</h4>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ 
                        background: getStatusColor(user.status),
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        textTransform: 'capitalize'
                      }}>
                        {user.status}
                      </span>
                      <span style={{ 
                        background: getRoleColor(user.role),
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        textTransform: 'capitalize'
                      }}>
                        {user.role.replace('_', ' ')}
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
                      <strong>Email:</strong>
                      <br />
                      {user.email}
                    </div>
                    <div>
                      <strong>Join Date:</strong>
                      <br />
                      {user.joinDate}
                    </div>
                    <div>
                      <strong>Last Login:</strong>
                      <br />
                      {user.lastLogin}
                    </div>
                    <div>
                      <strong>User ID:</strong>
                      <br />
                      <code style={{ fontSize: '12px', color: '#666' }}>{user.id}</code>
                    </div>
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
                      Edit
                    </button>
                    <button
                      style={{
                        background: user.status === 'active' ? '#faad14' : '#52c41a',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      {user.status === 'active' ? 'Suspend' : 'Activate'}
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
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Companies Tab */}
        {activeTab === 'companies' && (
          <div>
            <h3 style={{ marginBottom: '20px' }}>Company Verification Requests</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '20px' 
            }}>
              {companies.map((company) => (
                <div
                  key={company.id}
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
                    <h4 style={{ margin: 0, color: '#1890ff' }}>{company.name}</h4>
                    <span style={{ 
                      background: getVerificationStatusColor(company.verificationStatus),
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      textTransform: 'capitalize'
                    }}>
                      {company.verificationStatus}
                    </span>
                  </div>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <strong>Address:</strong>
                      <br />
                      {company.address}
                    </div>
                    <div>
                      <strong>Request Date:</strong>
                      <br />
                      {company.requestDate}
                    </div>
                    <div>
                      <strong>Documents:</strong>
                      <br />
                      {company.documents.join(', ')}
                    </div>
                    <div>
                      <strong>Company ID:</strong>
                      <br />
                      <code style={{ fontSize: '12px', color: '#666' }}>{company.id}</code>
                    </div>
                  </div>
                  
                  {company.adminNotes && (
                    <div style={{ 
                      background: '#f9f9f9', 
                      padding: '12px', 
                      borderRadius: '8px',
                      border: '1px solid #f0f0f0',
                      marginBottom: '16px'
                    }}>
                      <strong>Admin Notes:</strong> {company.adminNotes}
                    </div>
                  )}
                  
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px',
                    justifyContent: 'flex-end'
                  }}>
                    {company.verificationStatus === 'pending' && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedCompany(company);
                            setShowCompanyModal(true);
                          }}
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
                          Verify
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCompany(company);
                            setShowCompanyModal(true);
                          }}
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

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div>
            <h3 style={{ marginBottom: '20px' }}>Role Management & Permissions</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '20px' 
            }}>
              {rolePermissions.map((rolePerm, index) => (
                <div
                  key={index}
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
                    <h4 style={{ margin: 0, color: '#eb2f96' }}>
                      {rolePerm.role.charAt(0).toUpperCase() + rolePerm.role.slice(1)} Role
                    </h4>
                    <span style={{ 
                      background: getRoleColor(rolePerm.role),
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>
                      {rolePerm.role}
                    </span>
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <strong>Permissions:</strong>
                    <ul style={{ margin: '8px 0 0 20px', padding: 0 }}>
                      {rolePerm.permissions.map((permission, permIndex) => (
                        <li key={permIndex} style={{ marginBottom: '4px', color: '#666' }}>
                          {permission}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '8px',
                    marginBottom: '16px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      fontSize: '14px'
                    }}>
                      <span style={{ 
                        color: rolePerm.canManageUsers ? '#52c41a' : '#ff4d4f',
                        fontSize: '16px'
                      }}>
                        {rolePerm.canManageUsers ? '✅' : '❌'}
                      </span>
                      Manage Users
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      fontSize: '14px'
                    }}>
                      <span style={{ 
                        color: rolePerm.canVerifyCompanies ? '#52c41a' : '#ff4d4f',
                        fontSize: '16px'
                      }}>
                        {rolePerm.canVerifyCompanies ? '✅' : '❌'}
                      </span>
                      Verify Companies
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      fontSize: '14px'
                    }}>
                      <span style={{ 
                        color: rolePerm.canViewAnalytics ? '#52c41a' : '#ff4d4f',
                        fontSize: '16px'
                      }}>
                        {rolePerm.canViewAnalytics ? '✅' : '❌'}
                      </span>
                      View Analytics
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      fontSize: '14px'
                    }}>
                      <span style={{ 
                        color: rolePerm.canManageSystem ? '#52c41a' : '#ff4d4f',
                        fontSize: '16px'
                      }}>
                        {rolePerm.canManageSystem ? '✅' : '❌'}
                      </span>
                      Manage System
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px',
                    justifyContent: 'flex-end'
                  }}>
                    <button
                      style={{
                        background: '#eb2f96',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Edit Permissions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Company Verification Modal */}
      {showCompanyModal && selectedCompany && (
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
            maxWidth: '600px',
            width: '90%'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#eb2f96' }}>
              Company Verification: {selectedCompany.name}
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              <strong>Documents Submitted:</strong>
              <ul style={{ margin: '8px 0 0 20px', padding: 0 }}>
                {selectedCompany.documents.map((doc, index) => (
                  <li key={index} style={{ marginBottom: '4px', color: '#666' }}>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Admin Notes:
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add your verification notes here..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '8px',
                  fontSize: '14px',
                  minHeight: '100px',
                  resize: 'vertical'
                }}
              />
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '12px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setShowCompanyModal(false)}
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
                onClick={() => handleCompanyVerification(selectedCompany.id, 'rejected')}
                style={{
                  background: '#ff4d4f',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Reject
              </button>
              <button
                onClick={() => handleCompanyVerification(selectedCompany.id, 'verified')}
                style={{
                  background: '#52c41a',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
