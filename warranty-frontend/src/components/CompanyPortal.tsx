import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  warrantyPeriod: number;
  stock: number;
  mintedWarranties: number;
}

interface Warranty {
  id: string;
  productId: string;
  productName: string;
  customerAddress: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'claimed';
}

const CompanyPortal: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [activeTab, setActiveTab] = useState('products');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showMintWarranty, setShowMintWarranty] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    setProducts([
      {
        id: '1',
        name: 'Smartphone X1',
        description: 'Latest smartphone with advanced features',
        category: 'Electronics',
        price: 999.99,
        warrantyPeriod: 24,
        stock: 150,
        mintedWarranties: 89
      },
      {
        id: '2',
        name: 'Laptop Pro',
        description: 'Professional laptop for heavy workloads',
        category: 'Electronics',
        price: 1499.99,
        warrantyPeriod: 36,
        stock: 75,
        mintedWarranties: 45
      },
      {
        id: '3',
        name: 'Wireless Headphones',
        description: 'Premium noise-canceling headphones',
        category: 'Audio',
        price: 299.99,
        warrantyPeriod: 12,
        stock: 200,
        mintedWarranties: 156
      }
    ]);

    setWarranties([
      {
        id: 'w1',
        productId: '1',
        productName: 'Smartphone X1',
        customerAddress: '0x1234...5678',
        issueDate: '2024-01-15',
        expiryDate: '2026-01-15',
        status: 'active'
      },
      {
        id: 'w2',
        productId: '2',
        productName: 'Laptop Pro',
        customerAddress: '0x8765...4321',
        issueDate: '2024-02-01',
        expiryDate: '2027-02-01',
        status: 'active'
      }
    ]);
  }, []);

  const handleAddProduct = (productData: Omit<Product, 'id' | 'mintedWarranties'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      mintedWarranties: 0
    };
    setProducts([...products, newProduct]);
    setShowAddProduct(false);
    alert(`Product ${productData.name} added successfully!`);
  };

  const handleMintWarranty = (warrantyData: { productId: string; customerAddress: string }) => {
    const product = products.find(p => p.id === warrantyData.productId);
    if (!product) return;

    const newWarranty: Warranty = {
      id: `w${Date.now()}`,
      productId: warrantyData.productId,
      productName: product.name,
      customerAddress: warrantyData.customerAddress,
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + product.warrantyPeriod * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active'
    };

    setWarranties([...warranties, newWarranty]);
    
    // Update product minted warranties count
    setProducts(products.map(p => 
      p.id === warrantyData.productId 
        ? { ...p, mintedWarranties: p.mintedWarranties + 1 }
        : p
    ));

    setShowMintWarranty(false);
    alert(`Warranty for ${product.name} minted successfully!`);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '32px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 style={{ color: 'white', marginBottom: '16px', fontSize: '36px' }}>
          🏢 Company Portal
        </h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>
          Manage products, mint warranties, and track inventory
        </p>
        <div style={{ 
          background: 'rgba(255,255,255,0.2)', 
          padding: '8px 16px', 
          borderRadius: '20px',
          fontSize: '14px',
          display: 'inline-block',
          marginTop: '16px'
        }}>
          Demo Mode - No Wallet Required
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
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
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>{products.length}</h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Total Products</p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>{warranties.length}</h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Active Warranties</p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>
            {products.reduce((sum, p) => sum + p.stock, 0)}
          </h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Total Stock</p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>
            ${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}
          </h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Inventory Value</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        marginBottom: '32px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setShowAddProduct(true)}
          style={{
            background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '20px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ➕ Add Product
        </button>
        <button
          onClick={() => setShowMintWarranty(true)}
          style={{
            background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '20px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🪙 Mint Warranty
        </button>
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
            onClick={() => setActiveTab('products')}
            style={{
              background: activeTab === 'products' ? '#1890ff' : 'transparent',
              color: activeTab === 'products' ? 'white' : '#666',
              border: '1px solid #d9d9d9',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            📦 Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('warranties')}
            style={{
              background: activeTab === 'warranties' ? '#1890ff' : 'transparent',
              color: activeTab === 'warranties' ? 'white' : '#666',
              border: '1px solid #d9d9d9',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            🛡️ Warranties ({warranties.length})
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <h3 style={{ marginBottom: '20px' }}>Product Inventory</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px' 
            }}>
              {products.map((product) => (
                <div
                  key={product.id}
                  style={{
                    border: '1px solid #f0f0f0',
                    borderRadius: '12px',
                    padding: '20px',
                    background: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <h4 style={{ margin: '0 0 12px 0', color: '#1890ff' }}>{product.name}</h4>
                  <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
                    {product.description}
                  </p>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <strong>Category:</strong> {product.category}
                    </div>
                    <div>
                      <strong>Price:</strong> ${product.price}
                    </div>
                    <div>
                      <strong>Stock:</strong> {product.stock}
                    </div>
                    <div>
                      <strong>Warranty:</strong> {product.warrantyPeriod} months
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: '#f8f9fa', 
                    padding: '12px', 
                    borderRadius: '8px',
                    textAlign: 'center',
                    marginBottom: '16px'
                  }}>
                    <strong>Minted Warranties:</strong> {product.mintedWarranties}
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowMintWarranty(true);
                    }}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Mint Warranty
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warranties Tab */}
        {activeTab === 'warranties' && (
          <div>
            <h3 style={{ marginBottom: '20px' }}>Active Warranties</h3>
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
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <h4 style={{ margin: 0, color: '#1890ff' }}>{warranty.productName}</h4>
                    <span style={{ 
                      background: warranty.status === 'active' ? '#52c41a' : '#ff4d4f',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      textTransform: 'capitalize'
                    }}>
                      {warranty.status}
                    </span>
                  </div>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <strong>Warranty ID:</strong>
                      <br />
                      <code style={{ fontSize: '12px', color: '#666' }}>{warranty.id}</code>
                    </div>
                    <div>
                      <strong>Customer:</strong>
                      <br />
                      <code style={{ fontSize: '12px', color: '#666' }}>{warranty.customerAddress}</code>
                    </div>
                    <div>
                      <strong>Issue Date:</strong>
                      <br />
                      {warranty.issueDate}
                    </div>
                    <div>
                      <strong>Expiry Date:</strong>
                      <br />
                      {warranty.expiryDate}
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: '#e6f7ff', 
                    padding: '12px', 
                    borderRadius: '8px',
                    border: '1px solid #91d5ff'
                  }}>
                    <strong>Status:</strong> This warranty is currently active and valid for customer use.
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
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
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h2 style={{ marginBottom: '24px' }}>Add New Product</h2>
            <AddProductForm onSubmit={handleAddProduct} onCancel={() => setShowAddProduct(false)} />
          </div>
        </div>
      )}

      {/* Mint Warranty Modal */}
      {showMintWarranty && (
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
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h2 style={{ marginBottom: '24px' }}>Mint New Warranty</h2>
            <MintWarrantyForm 
              products={products}
              selectedProduct={selectedProduct}
              onSubmit={handleMintWarranty} 
              onCancel={() => setShowMintWarranty(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Add Product Form Component
const AddProductForm: React.FC<{
  onSubmit: (data: Omit<Product, 'id' | 'mintedWarranties'>) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    warrantyPeriod: '',
    stock: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      description: formData.description,
      category: formData.category,
      price: parseFloat(formData.price),
      warrantyPeriod: parseInt(formData.warrantyPeriod),
      stock: parseInt(formData.stock)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Product Name *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #d9d9d9',
            borderRadius: '8px',
            fontSize: '14px'
          }}
        />
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Description *
        </label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #d9d9d9',
            borderRadius: '8px',
            fontSize: '14px',
            minHeight: '80px'
          }}
        />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Category *
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d9d9d9',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Audio">Audio</option>
            <option value="Computers">Computers</option>
            <option value="Mobile">Mobile</option>
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Price ($) *
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d9d9d9',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Warranty Period (months) *
          </label>
          <input
            type="number"
            required
            min="1"
            value={formData.warrantyPeriod}
            onChange={(e) => setFormData({...formData, warrantyPeriod: e.target.value})}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d9d9d9',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Initial Stock *
          </label>
          <input
            type="number"
            required
            min="0"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d9d9d9',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '12px 24px',
            border: '1px solid #d9d9d9',
            borderRadius: '8px',
            background: 'white',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

// Mint Warranty Form Component
const MintWarrantyForm: React.FC<{
  products: Product[];
  selectedProduct: Product | null;
  onSubmit: (data: { productId: string; customerAddress: string }) => void;
  onCancel: () => void;
}> = ({ products, selectedProduct, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    productId: selectedProduct?.id || '',
    customerAddress: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Select Product *
        </label>
        <select
          required
          value={formData.productId}
          onChange={(e) => setFormData({...formData, productId: e.target.value})}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #d9d9d9',
            borderRadius: '8px',
            fontSize: '14px'
          }}
        >
          <option value="">Select a Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - ${product.price} (Stock: {product.stock})
            </option>
          ))}
        </select>
      </div>
      
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Customer Wallet Address *
        </label>
        <input
          type="text"
          required
          placeholder="0x..."
          value={formData.customerAddress}
          onChange={(e) => setFormData({...formData, customerAddress: e.target.value})}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #d9d9d9',
            borderRadius: '8px',
            fontSize: '14px'
          }}
        />
      </div>
      
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '12px 24px',
            border: '1px solid #d9d9d9',
            borderRadius: '8px',
            background: 'white',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Mint Warranty
        </button>
      </div>
    </form>
  );
};

export default CompanyPortal;
