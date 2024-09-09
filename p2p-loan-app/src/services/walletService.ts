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
    user: null;
    walletProvider: null;
    topUpDetails: {
      id: string;
      walletId: string;
      accountNumber: string;
      accountName: string;
      bankCode: string;
      bankName: string;
      createdAt: string;
      modifiedAt: string;
      createdById: string;
      createdBy: null;
      modifiedById: string;
      modifiedBy: null;
    }[];
    createdAt: string;
    modifiedAt: string;
    createdById: string;
    createdBy: null;
    modifiedById: string;
    modifiedBy: null;
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

export interface WalletTransaction {}

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
