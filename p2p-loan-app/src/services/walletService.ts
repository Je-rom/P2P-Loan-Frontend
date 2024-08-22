import axiosConfig from '@/config/axios';
import axios, { AxiosResponse } from 'axios';

export interface WalletProvidersResponse {
  status: string;
  statusCode: string;
  message: string;
  result: Array<{
    id: string;
    name: string;
    description: string;
    slug: string;
    enabled: boolean;
    createdAt: string;
    modifiedAt: string;
    createdById: string;
    createdBy: string | null;
    modifiedById: string;
    modifiedBy: string | null;
  }>;
}

export interface WalletResponse {
  status: string;
  statusCode: string;
  message: string;
  result: {
    id: string;
    userId: string;
    walletProviderId: string;
    accountNumber: string;
    referenceId: string;
    topUpAccountNumber: string;
    topUpAccountName: string;
    topUpBankCode: string;
    topUpBankName: string;
    createdAt: string;
    modifiedAt: string;
    createdById: string;
    createdBy: any;
    modifiedById: string;
    modifiedBy: any;
  }[];
}

export interface WalletBalance {
  status: string;
  statusCode: string;
  message: string;
  result: {
    availableBalance: number;
    ledgerBalance: number;
  };
}

class WalletService {
  static getWalletProvider = async (): Promise<
    AxiosResponse<WalletProvidersResponse>
  > => {
    return await axiosConfig.get('/api/wallet-provider');
  };

  static getWallet = async (): Promise<AxiosResponse<WalletResponse>> => {
    return await axiosConfig.get('/api/wallet/me');
  };

  static getWalletBalance = async (
    walletId: string,
  ): Promise<AxiosResponse<WalletBalance>> => {
    return await axiosConfig.get(`/api/wallet/balance/${walletId}`);
  };
}

export default WalletService;
