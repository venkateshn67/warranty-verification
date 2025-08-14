import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AptosClient, AptosAccount } from 'aptos';
import { blockchainService } from '../services/blockchainService';

interface WalletContextType {
  isConnected: boolean;
  account: AptosAccount | null;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  userRole: 'customer' | 'company' | 'seller' | 'service_center' | 'admin' | null;
  setUserRole: (role: 'customer' | 'company' | 'seller' | 'service_center' | 'admin') => void;
  client: AptosClient;
  accountBalance: number;
  refreshBalance: () => Promise<void>;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

// Define wallet event types
interface WalletAccount {
  address: string;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<AptosAccount | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'customer' | 'company' | 'seller' | 'service_center' | 'admin' | null>(null);
  const [accountBalance, setAccountBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  // Initialize Aptos client for testnet
  const client = new AptosClient('https://fullnode.testnet.aptoslabs.com/v1');

  // Get Petra wallet instance
  const getPetraWallet = () => {
    if (typeof window !== 'undefined' && 'aptos' in window) {
      return (window as any).aptos;
    }
    return null;
  };

  // Refresh account balance
  const refreshBalance = async () => {
    if (address) {
      try {
        const balance = await blockchainService.getAccountBalance(address);
        setAccountBalance(balance);
      } catch (error) {
        console.error('Failed to refresh balance:', error);
        // Fallback to dummy balance
        setAccountBalance(100);
      }
    }
  };

  // Connect to Petra wallet
  const connect = async () => {
    try {
      const petraWallet = getPetraWallet();
      
      if (!petraWallet) {
        throw new Error('Petra wallet not found. Please install the Petra wallet extension.');
      }

      // Request connection
      const response = await petraWallet.connect();
      
      if (response.address) {
        // Create a dummy AptosAccount for now since we can't create from address
        const connectedAccount = new AptosAccount();
        
        setAccount(connectedAccount);
        setAddress(response.address);
        setIsConnected(true);
        
        // Store connection state in localStorage
        localStorage.setItem('walletConnected', 'true');
        localStorage.setItem('walletAddress', response.address);
        
        // Get account balance
        await refreshBalance();
        
        // Try to determine user role from blockchain data
        await determineUserRole(response.address);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  };

  // Disconnect wallet
  const disconnect = () => {
    const petraWallet = getPetraWallet();
    if (petraWallet) {
      try {
        petraWallet.disconnect();
      } catch (error) {
        console.error('Error disconnecting wallet:', error);
      }
    }
    
    setAccount(null);
    setAddress(null);
    setIsConnected(false);
    setUserRole(null);
    setAccountBalance(0);
    
    // Clear localStorage
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('userRole');
  };

  // Determine user role from blockchain data
  const determineUserRole = async (walletAddress: string) => {
    try {
      // Use blockchain service to determine role
      const role = await blockchainService.getUserRole(walletAddress);
      
      if (role) {
        setUserRole(role as any);
        localStorage.setItem('userRole', role);
      } else {
        // Default to customer if no specific role is found
        setUserRole('customer');
        localStorage.setItem('userRole', 'customer');
      }
    } catch (error) {
      console.error('Failed to determine user role:', error);
      // Default to customer on error
      setUserRole('customer');
      localStorage.setItem('userRole', 'customer');
    }
  };

  // Check for existing connection on mount
  useEffect(() => {
    const checkExistingConnection = async () => {
      try {
        const petraWallet = getPetraWallet();
        
        if (petraWallet && localStorage.getItem('walletConnected') === 'true') {
          const address = localStorage.getItem('walletAddress');
          const role = localStorage.getItem('userRole') as any;
          
          if (address) {
            const connectedAccount = new AptosAccount();
            
            setAccount(connectedAccount);
            setAddress(address);
            setIsConnected(true);
            
            // Get account balance
            await refreshBalance();
            
            if (role) {
              setUserRole(role);
            } else {
              await determineUserRole(address);
            }
          }
        }
      } catch (error) {
        console.error('Failed to restore wallet connection:', error);
        // Clear invalid connection data
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletAddress');
        localStorage.removeItem('userRole');
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingConnection();
    
    // Fallback: if for some reason the connection check doesn't complete, set loading to false after a timeout
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Listen for wallet connection changes
  useEffect(() => {
    const petraWallet = getPetraWallet();
    
    if (petraWallet) {
      const handleAccountChange = async (newAccount: WalletAccount) => {
        if (newAccount.address) {
          setAddress(newAccount.address);
          localStorage.setItem('walletAddress', newAccount.address);
          await refreshBalance();
          await determineUserRole(newAccount.address);
        } else {
          disconnect();
        }
      };

      const handleDisconnect = () => {
        disconnect();
      };

      try {
        petraWallet.onAccountChange(handleAccountChange);
        petraWallet.onDisconnect(handleDisconnect);
      } catch (error) {
        console.error('Error setting up wallet listeners:', error);
      }

      return () => {
        try {
          petraWallet.offAccountChange(handleAccountChange);
          petraWallet.offDisconnect(handleDisconnect);
        } catch (error) {
          console.error('Error removing wallet listeners:', error);
        }
      };
    }
  }, []);

  const value: WalletContextType = {
    isConnected,
    account,
    address,
    connect,
    disconnect,
    userRole,
    setUserRole,
    client,
    accountBalance,
    refreshBalance,
    isLoading // Added isLoading to context value
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
