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

export interface WithdrawRequest {
  amount: number;
  walletId: string;
  destinationBankCode: string;
  destinationAccountNumber: string;
  currency: string;
  PIN: string;
}

export interface WithdrawResponse {
  status: string;
  statusCode: string;
  message: string;
  result: null;
}

export interface WithdrawalFeeResponse {
  status: string;
  statusCode: string;
  message: string;
  result: {
    fee: number;
  };
}

export interface WalletTransactionResponse {
  status: string;
  statusCode: string;
  message: string;
  result: {
    content: {
      id: string;
      amount: number;
      isCredit: boolean;
      narration: string;
      transactionDate: string;
      transactionReference: string;
    }[];
    totalPages: number;
    pageSize: number;
    pageNo: number;
    totalElements: number;
    numberOfElements: number;
    size: number;
    number: number;
    empty: boolean;
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

  static withdraw = async (
    requestBody: WithdrawRequest,
  ): Promise<AxiosResponse<WithdrawResponse>> => {
    return await axiosConfig.post('/api/wallet/withdraw', requestBody);
  };

  static withdrawalFee = async (
    amount: number,
  ): Promise<AxiosResponse<WithdrawalFeeResponse>> => {
    return await axiosConfig.get(`/api/wallet/withdrawal/fee/${amount}`);
  };

  static walletTransaction = async (
    walletId: string,
    totalPages: number,
    pageSize: number,
    pageNo: number,
    totalElements: number,
  ): Promise<AxiosResponse<WalletTransactionResponse>> => {
    return await axiosConfig.get(`/api/wallet/transactions/${walletId}`, {
      params: {
        totalPages,
        pageSize,
        pageNo,
        totalElements,
      },
    });
  };
}

export default WalletService;
