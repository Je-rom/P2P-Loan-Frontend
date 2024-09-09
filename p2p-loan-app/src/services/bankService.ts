import axiosConfig from '@/config/axios';
import axios, { AxiosResponse } from 'axios';

export interface BanksResponse {
  status: string;
  statusCode: string;
  message: string;
  result: {
    requestSuccessful: string;
    responseMessage: string;
    responseCode: string;
    responseBody: {
      name: string;
      code: string;
      ussdTemplate: null;
      baseUssdCode: null;
      transferUssdTemplate: null;
    }[];
  };
}

export interface AccountDetailsResponse {
  status: string;
  statusCode: string;
  message: string;
  result: {
    requestSuccessful: string;
    responseMessage: string;
    responseCode: string;
    responseBody: {
      accountNumber: string;
      accountName: string;
      bankCode: string;
    };
  };
}

class BankService {
  static getBanks = async (): Promise<AxiosResponse<BanksResponse>> => {
    return await axiosConfig.get('/api/bank');
  };

  static getAccountDetails = async (
    AccountNumber: number,
    BankCode: number,
  ): Promise<AxiosResponse<AccountDetailsResponse>> => {
    return await axiosConfig.get('/api/bank/verify', {
      params: {
        AccountNumber,
        BankCode,
      },
    });
  };
}

export default BankService;
