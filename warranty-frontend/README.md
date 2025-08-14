# Warranty Verification System Frontend

A modern React-based frontend for the warranty verification system powered by Aptos blockchain.

## 🚀 Quick Start

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn
- Petra Wallet browser extension installed

### Installation & Running

1. **Navigate to the frontend directory:**
   ```bash
   cd warranty-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` in your Chrome browser.

## 🔧 Available Scripts

- `npm start` - Start development server (alias for `npm run dev`)
- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛠️ Troubleshooting

### White Screen Issues

If you encounter a white screen:

1. **Check browser console** for JavaScript errors
2. **Clear browser cache** and refresh
3. **Check wallet connection** - ensure Petra wallet is installed and unlocked
4. **Verify network connection** - ensure you're connected to Aptos Testnet

### Common Errors

#### Wallet Connection Issues
- **"Petra wallet not found"**: Install Petra wallet extension
- **"Wallet not unlocked"**: Unlock your Petra wallet
- **"Network mismatch"**: Switch to Aptos Testnet in Petra wallet

#### Build Errors
- **TypeScript errors**: Run `npm run lint` to identify issues
- **Dependency issues**: Delete `node_modules` and run `npm install` again

### Debug Mode

The application includes comprehensive logging. Open browser console to see:
- Wallet connection status
- Component render cycles
- Error details
- Network requests

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Dashboard.tsx   # Home dashboard
│   ├── WalletConnection.tsx # Wallet connection UI
│   └── ...            # Portal components
├── contexts/           # React contexts
│   └── WalletContext.tsx # Wallet state management
├── services/           # API services
│   └── blockchainService.ts # Blockchain interactions
└── main.tsx           # Application entry point
```

## 🔐 Wallet Integration

### Petra Wallet Setup

1. Install [Petra Wallet](https://petra.app/) browser extension
2. Create or import a wallet
3. Switch to **Aptos Testnet** network
4. Ensure you have test APT tokens

### Supported Features

- ✅ Wallet connection/disconnection
- ✅ Account balance display
- ✅ User role detection
- ✅ Transaction signing (coming soon)

## 🌐 Network Configuration

- **Current Network**: Aptos Testnet
- **RPC Endpoint**: `https://fullnode.testnet.aptoslabs.com/v1`
- **Contract**: Deployed on testnet (address in dashboard)

## 🎨 UI Features

- **Responsive Design**: Works on desktop and mobile
- **Dark Theme**: Modern gradient-based design
- **Role-based Navigation**: Different menus for different user types
- **Error Boundaries**: Graceful error handling
- **Loading States**: Smooth user experience

## 🚨 Error Handling

The application includes multiple layers of error handling:

1. **Error Boundaries**: Catch React component errors
2. **Try-catch blocks**: Handle async operations
3. **Fallback UI**: Show helpful error messages
4. **Console logging**: Detailed debugging information

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 🔄 Development Workflow

1. Make changes to source code
2. Save files (auto-reload enabled)
3. Check browser console for errors
4. Test wallet functionality
5. Verify responsive design

## 📞 Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify Petra wallet is properly configured
3. Ensure you're on the correct network (Aptos Testnet)
4. Try refreshing the page
5. Clear browser cache and cookies

## 🚀 Production Deployment

To build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

---

**Note**: This is a development version. For production use, ensure proper security measures and error handling are in place.
