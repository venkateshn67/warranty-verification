# 🛡️ Warranty Verification System

A comprehensive blockchain-based warranty management system built on the Aptos blockchain, featuring smart contracts in Move and a modern React frontend.

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

**Built with ❤️ for the Aptos ecosystem**

[View on GitHub](https://github.com/venkateshn67/warranty-verification)
