# 🛡️ Warranty Verification System

A comprehensive blockchain-based warranty management system built on the Aptos blockchain, featuring smart contracts in Move and a modern React frontend.

## 👥 **Team - The Blockheads**

**"Transforming Traditional Systems Through Blockchain Innovation"**

### **Team Members**

| **J. KRISHNA PRASANTH** | **K. VENKATESWA RAO** | **N. VENKATESH** |

### **🏆 Our Mission**
*"To revolutionize warranty management by creating a transparent, secure, and efficient blockchain-based ecosystem that eliminates fraud and enhances trust between all stakeholders."*

---

## 🌟 Features

### 🔗 **Blockchain Integration**
- **Smart Contracts**: Written in Move language for Aptos blockchain
- **NFT Warranty Tokens**: Unique digital warranties as non-fungible tokens
- **Decentralized Verification**: Trustless warranty validation system

### 🏢 **Multi-Role Support**
- **Company Portal**: Mint warranties, manage products, track inventory
- **Seller Portal**: Sell products, manage warranties, build reputation
- **Customer Portal**: Own warranties, transfer tokens, verify validity
- **Service Center**: Verify warranties, extend coverage, manage services
- **Admin Portal**: System oversight, role management, verification control

### 🎨 **Modern Frontend**
- **React 19 + TypeScript**: Latest frontend technologies
- **Responsive Design**: Works on all devices
- **Wallet Integration**: Petra wallet support for Aptos
- **Error Handling**: Comprehensive error boundaries and user feedback

## 🏗️ Architecture

```
warranty_verification/
├── sources/                 # Move smart contracts
│   └── warranty_nft.move   # Core warranty NFT contract
├── tests/                  # Contract test files
├── warranty-frontend/      # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # State management
│   │   └── services/       # Blockchain services
│   └── public/             # Static assets
└── scripts/                # Deployment and utility scripts
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js (v18+)
- Aptos CLI
- Petra Wallet extension

### **Frontend Setup**
```bash
cd warranty-frontend
npm install
npm start
```

### **Smart Contract Setup**
```bash
# Deploy to Aptos testnet
aptos move publish --named-addresses warranty_system=YOUR_ADDRESS
```

## 🔐 Smart Contracts

### **Warranty NFT Contract**
- **Location**: `sources/warranty_nft.move`
- **Features**:
  - Mint warranty tokens
  - Transfer ownership
  - Verify validity
  - Extend coverage
  - Role-based access control

### **Testing**
```bash
cd tests
aptos move test
```

## 🌐 Frontend Application

### **Technologies Used**
- **React 19** with TypeScript
- **Vite** for fast development
- **Aptos SDK** for blockchain interaction
- **Petra Wallet** integration
- **Responsive CSS** with modern design

### **Key Components**
- **Dashboard**: System overview and role selection
- **Wallet Connection**: Secure wallet integration
- **Portal Components**: Role-specific interfaces
- **Error Boundaries**: Graceful error handling

## 🔧 Development

### **Available Scripts**
```bash
npm start          # Start development server
npm run dev        # Start with Vite
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### **Environment Setup**
- **Network**: Aptos Testnet
- **RPC Endpoint**: `https://fullnode.testnet.aptoslabs.com/v1`
- **Wallet**: Petra Wallet extension required

## 📱 User Experience

### **Responsive Design**
- **Desktop**: Full-featured interface with sidebar navigation
- **Mobile**: Optimized mobile experience
- **Tablet**: Adaptive layout for medium screens

### **Error Handling**
- **Error Boundaries**: Catch and display React errors
- **User Feedback**: Clear error messages and solutions
- **Loading States**: Smooth transitions and feedback

## 🚀 Deployment

### **Frontend Deployment**
```bash
npm run build
# Deploy dist/ folder to any static hosting service
```

### **Smart Contract Deployment**
```bash
aptos move publish --named-addresses warranty_system=YOUR_ADDRESS
```

## 📸 **Implementation Screenshots**

### **🏠 Dashboard Overview**
<img width="1919" height="968" alt="image" src="https://github.com/user-attachments/assets/23fe6c39-bb9a-408b-98e2-5eef9dd5cc0c" />

*Main dashboard showing system overview, quick stats, and role selection cards*

### **🔗 Wallet Connection**
<img width="1907" height="952" alt="image" src="https://github.com/user-attachments/assets/24feef0b-998c-45df-830d-adde4788e4cb" />
<img width="1918" height="974" alt="image" src="https://github.com/user-attachments/assets/1f3ca8a1-a3d5-4698-84f2-80320ea45ad0" />
<img width="1908" height="961" alt="image" src="https://github.com/user-attachments/assets/f07aecfb-157c-4e45-87a5-186d3ebb672b" />
<img width="1919" height="966" alt="image" src="https://github.com/user-attachments/assets/265e2056-6eeb-484b-9326-fff83f8138d5" />





*Petra wallet integration with connection modal and status display*

### **🏢 Company Portal**
<img width="1919" height="966" alt="image" src="https://github.com/user-attachments/assets/8d70df40-7534-4bb4-ac3e-5fe339ae1641" />

*Company interface for minting warranties and managing products*

### **🏪 Seller Portal**
<img width="1919" height="951" alt="image" src="https://github.com/user-attachments/assets/3f9a60ff-599f-45bc-9bfc-464e718a62cf" />

*Seller dashboard for managing inventory and tracking sales*

### **👤 Customer Portal**
<img width="1919" height="948" alt="image" src="https://github.com/user-attachments/assets/509210a0-ff18-44be-862b-b837be56beff" />
<img width="1909" height="956" alt="image" src="https://github.com/user-attachments/assets/7259a0e8-6028-4296-8276-d5024406aa3b" />
<img width="1913" height="973" alt="image" src="https://github.com/user-attachments/assets/2512981e-7c43-4c3f-a3ef-2767c5b83fa6" />
<img width="1915" height="968" alt="image" src="https://github.com/user-attachments/assets/eaaeb11d-f6aa-4ce1-924d-dd22ea9f123b" />




*Customer interface for viewing and transferring warranty NFTs*

### **🔧 Service Center Portal**
<img width="1910" height="970" alt="image" src="https://github.com/user-attachments/assets/76230d09-5e25-40c7-b962-8fd897ade968" />

*Service center interface for warranty verification and extension*

### **👑 Admin Portal**
<img width="1919" height="969" alt="image" src="https://github.com/user-attachments/assets/dab87e99-036c-42e3-bb7d-2367abc30c3d" />

*Administrative dashboard for system oversight and role management*

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- **Issues**: Create an issue on GitHub
- **Documentation**: Check the README files
- **Smart Contracts**: Review Move contract code

## 🔮 Roadmap

- [ ] Multi-wallet support
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with other blockchains
- [ ] API for third-party integrations

## 🌟 Acknowledgments

- **Aptos Labs** for the Move language and blockchain
- **React Team** for the amazing frontend framework
- **Petra Wallet** for seamless wallet integration

---

**Built with ❤️ by The Blockheads for the Aptos ecosystem**

[View on GitHub](https://github.com/venkateshn67/warranty-verification)
