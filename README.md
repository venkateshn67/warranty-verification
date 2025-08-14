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
![Dashboard](<img width="1919" height="932" alt="image" src="https://github.com/user-attachments/assets/7fd3b576-001b-4d1b-81da-f435f1f69969" />
)
*Main dashboard showing system overview, quick stats, and role selection cards*

### **🔗 Wallet Connection**
![Wallet Connection](<img width="1906" height="969" alt="image" src="https://github.com/user-attachments/assets/6e1c1e5d-d7cc-4180-b76f-d4461d29038a" />
)
(<img width="1915" height="959" alt="image" src="https://github.com/user-attachments/assets/d6ed69d9-dc5e-4dff-8352-989be73488f7" />)

*Petra wallet integration with connection modal and status display*

### **🏢 Company Portal**
![Company Portal](<img width="1910" height="964" alt="image" src="https://github.com/user-attachments/assets/16320b67-3342-4fc5-9a6d-2a5d97bcf6d2" />
)
*Company interface for minting warranties and managing products*

### **🏪 Seller Portal**
![Seller Portal](<img width="1912" height="966" alt="image" src="https://github.com/user-attachments/assets/3c41748d-5c93-49e0-9397-2c479cffa13a" />
)
*Seller dashboard for managing inventory and tracking sales*

### **👤 Customer Portal**
![Customer Portal](<img width="1919" height="966" alt="image" src="https://github.com/user-attachments/assets/06ce8244-bad4-474d-8c5a-3f3f84b76fe2" />
)
(<img width="1915" height="956" alt="image" src="https://github.com/user-attachments/assets/901e604a-b485-42a0-9a30-fd473223e274" />

)
(<img width="1912" height="941" alt="image" src="https://github.com/user-attachments/assets/d897602f-226e-4df5-a7c8-5c5a4de75d39" />
)
*Customer interface for viewing and transferring warranty NFTs*

### **🔧 Service Center Portal**
![Service Center](<img width="1919" height="965" alt="image" src="https://github.com/user-attachments/assets/2c87fcee-a315-4538-a437-c8fe5f283525" />
)
*Service center interface for warranty verification and extension*

### **👑 Admin Portal**
![Admin Portal](<img width="1915" height="974" alt="image" src="https://github.com/user-attachments/assets/76bda17c-71a1-4695-84ad-3dca24182738" />
)
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
