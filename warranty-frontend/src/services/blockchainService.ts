import { AptosClient, AptosAccount } from 'aptos';

// Contract addresses and module names (these would be deployed on Aptos testnet)
// const CONTRACT_ADDRESS = '0x1234567890abcdef'; // Replace with actual deployed contract address

export interface WarrantyNFT {
  id: string;
  productName: string;
  companyAddress: string;
  customerAddress: string;
  purchaseDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'transferred' | 'void';
  tokenId: string;
  coverage: string;
  metadata: {
    serialNumber: string;
    model: string;
    warrantyType: string;
  };
}

export interface CompanyProfile {
  address: string;
  name: string;
  verified: boolean;
  verificationDate: string;
  documents: string[];
}

export interface ServiceRequest {
  id: string;
  customerAddress: string;
  warrantyTokenId: string;
  issue: string;
  requestDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export class BlockchainService {
  private client: AptosClient;

  constructor() {
    this.client = new AptosClient('https://fullnode.testnet.aptoslabs.com/v1');
  }

  // Get account balance
  async getAccountBalance(address: string): Promise<number> {
    try {
      const resources = await this.client.getAccountResources(address);
      const coinResource = resources.find((r: any) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>');
      
      if (coinResource && coinResource.data && typeof coinResource.data === 'object' && 'coin' in coinResource.data) {
        const coinData = coinResource.data as any;
        return parseInt(coinData.coin.value) / 100000000; // Convert from octas to APT
      }
      return 0;
    } catch (error) {
      console.error('Failed to get account balance:', error);
      return 0;
    }
  }

  // Get user role from blockchain
  async getUserRole(address: string): Promise<string | null> {
    try {
      // Check for role-specific NFTs or tokens
      const resources = await this.client.getAccountResources(address);
      
      // Check for admin role token
      const adminToken = resources.find((r: any) => 
        r.type.includes('AdminRoleToken')
      );
      if (adminToken) return 'admin';

      // Check for company verification token
      const companyToken = resources.find((r: any) => 
        r.type.includes('CompanyVerificationToken')
      );
      if (companyToken) return 'company';

      // Check for seller license token
      const sellerToken = resources.find((r: any) => 
        r.type.includes('SellerLicenseToken')
      );
      if (sellerToken) return 'seller';

      // Check for service center license token
      const serviceToken = resources.find((r: any) => 
        r.type.includes('ServiceCenterLicenseToken')
      );
      if (serviceToken) return 'service_center';

      // Default to customer
      return 'customer';
    } catch (error) {
      console.error('Failed to get user role:', error);
      return 'customer';
    }
  }

  // Get warranty NFTs owned by an address
  async getWarrantyNFTs(ownerAddress: string): Promise<WarrantyNFT[]> {
    try {
      // This would query the actual smart contract
      // For now, returning mock data that would come from blockchain
      const mockWarranties: WarrantyNFT[] = [
        {
          id: 'w1',
          productName: 'Smartphone X1',
          companyAddress: '0xabcdef1234567890',
          customerAddress: ownerAddress,
          purchaseDate: '2024-01-15',
          expiryDate: '2027-01-15',
          status: 'active',
          tokenId: 'NFT#001',
          coverage: '3 Years - Parts & Labor',
          metadata: {
            serialNumber: 'SN001234',
            model: 'X1-Pro',
            warrantyType: 'Premium'
          }
        }
      ];

      return mockWarranties;
    } catch (error) {
      console.error('Failed to get warranty NFTs:', error);
      return [];
    }
  }

  // Create a new warranty NFT
  async createWarrantyNFT(
    companyAccount: AptosAccount,
    customerAddress: string,
    productName: string,
    coverage: string,
    metadata: any
  ): Promise<string> {
    try {
      // This would create an actual transaction on the blockchain
      // For now, returning a mock transaction hash
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      console.log('Creating warranty NFT:', {
        companyAddress: companyAccount.address().toString(),
        customerAddress,
        productName,
        coverage,
        metadata
      });

      return mockTxHash;
    } catch (error) {
      console.error('Failed to create warranty NFT:', error);
      throw error;
    }
  }

  // Transfer warranty NFT
  async transferWarrantyNFT(
    fromAccount: AptosAccount,
    toAddress: string,
    tokenId: string
  ): Promise<string> {
    try {
      // This would create an actual transfer transaction
      // For now, returning a mock transaction hash
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      console.log('Transferring warranty NFT:', {
        from: fromAccount.address().toString(),
        to: toAddress,
        tokenId
      });

      return mockTxHash;
    } catch (error) {
      console.error('Failed to transfer warranty NFT:', error);
      throw error;
    }
  }

  // Verify warranty NFT
  async verifyWarrantyNFT(tokenId: string): Promise<WarrantyNFT | null> {
    try {
      // This would query the actual smart contract
      // For now, returning mock data
      const mockWarranty: WarrantyNFT = {
        id: 'v1',
        productName: 'Smartphone X1',
        companyAddress: '0xabcdef1234567890',
        customerAddress: '0x1234567890abcdef',
        purchaseDate: '2024-01-15',
        expiryDate: '2027-01-15',
        status: 'active',
        tokenId,
        coverage: '3 Years - Parts & Labor',
        metadata: {
          serialNumber: 'SN001234',
          model: 'X1-Pro',
          warrantyType: 'Premium'
        }
      };

      return mockWarranty;
    } catch (error) {
      console.error('Failed to verify warranty NFT:', error);
      return null;
    }
  }

  // Get company profile
  async getCompanyProfile(address: string): Promise<CompanyProfile | null> {
    try {
      // This would query the actual smart contract
      // For now, returning mock data
      const mockProfile: CompanyProfile = {
        address,
        name: 'TechCorp Inc.',
        verified: true,
        verificationDate: '2023-02-15',
        documents: ['Business License', 'Tax Certificate', 'Insurance Policy']
      };

      return mockProfile;
    } catch (error) {
      console.error('Failed to get company profile:', error);
      return null;
    }
  }

  // Create service request
  async createServiceRequest(
    customerAccount: AptosAccount,
    warrantyTokenId: string,
    issue: string,
    priority: string
  ): Promise<string> {
    try {
      // This would create an actual transaction on the blockchain
      // For now, returning a mock transaction hash
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      console.log('Creating service request:', {
        customerAddress: customerAccount.address().toString(),
        warrantyTokenId,
        issue,
        priority
      });

      return mockTxHash;
    } catch (error) {
      console.error('Failed to create service request:', error);
      throw error;
    }
  }

  // Get service requests
  async getServiceRequests(_serviceCenterAddress?: string): Promise<ServiceRequest[]> {
    try {
      // This would query the actual smart contract
      // For now, returning mock data
      const mockRequests: ServiceRequest[] = [
        {
          id: 'sr1',
          customerAddress: '0x1234567890abcdef',
          warrantyTokenId: 'NFT#001',
          issue: 'Screen not responding to touch',
          requestDate: '2024-02-01',
          status: 'pending',
          priority: 'high'
        }
      ];

      return mockRequests;
    } catch (error) {
      console.error('Failed to get service requests:', error);
      return [];
    }
  }

  // Update service request status
  async updateServiceRequestStatus(
    serviceCenterAccount: AptosAccount,
    requestId: string,
    status: string
  ): Promise<string> {
    try {
      // This would create an actual transaction on the blockchain
      // For now, returning a mock transaction hash
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      console.log('Updating service request status:', {
        serviceCenterAddress: serviceCenterAccount.address().toString(),
        requestId,
        status
      });

      return mockTxHash;
    } catch (error) {
      console.error('Failed to update service request status:', error);
      throw error;
    }
  }

  // Get transaction status
  async getTransactionStatus(_txHash: string): Promise<'pending' | 'success' | 'failed'> {
    try {
      // For now, assume success - in real implementation, check transaction status
      // const tx = await this.client.getTransactionByHash(txHash);
      return 'success';
    } catch (error) {
      console.error('Failed to get transaction status:', error);
      return 'pending';
    }
  }

  // Get network info
  async getNetworkInfo() {
    try {
      const ledgerInfo = await this.client.getLedgerInfo();
      return {
        chainId: ledgerInfo.chain_id,
        epoch: ledgerInfo.epoch,
        version: '1.0.0', // Mock version for now
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to get network info:', error);
      return null;
    }
  }
}

export const blockchainService = new BlockchainService();
