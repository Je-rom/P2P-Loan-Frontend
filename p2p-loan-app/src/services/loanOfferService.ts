import axiosConfig from '@/config/axios';
import axios, { AxiosResponse } from 'axios';

export interface CreateLoanOfferRequest {
  walletId: string;
  amount: string;
  paymentFrequency: string;
  gracePeriodDays: number;
  loanDurationDays: number;
  interestRate: number;
  accruingInterestRate: string;
  additionalInformation: string;
}

export interface CreateLoanOfferResponse {
  status: string;
  statusCode: string;
  message: string;
  result: any;
}

export interface MyLoanOfferResponse {
  status: string;
  statusCode: string;
  message: string;
  result: {
    items: {
      id: string;
      userId: string;
      walletId: string;
      amount: number;
      repaymentFrequency: string;
      gracePeriodDays: number;
      loanDurationDays: number;
      accruingInterestRate: number;
      interestRate: number;
      additionalInformation: string;
      type: string;
      active: boolean;
      user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        bvnVerified: boolean;
        userType: string;
        createdAt: string;
        modifiedAt: string;
      };
      wallet: {
        id: string;
        userId: string;
        walletProviderId: string;
        accountNumber: string;
        referenceId: string;
        topUpAccountNumber: string;
        topUpAccountName: string;
        topUpBankCode: string;
        topUpBankName: string;
        user: {
          id: string;
          firstName: string;
          lastName: string;
          email: string;
          emailConfirmed: boolean;
          pinCreated: boolean;
          userType: string;
          createdAt: string;
          modifiedAt: string;
          userRoles: any[];
        };
        walletProvider: {
          id: string;
          name: string;
          description: string;
          slug: string;
          enabled: boolean;
          createdAt: string;
          modifiedAt: string;
          createdById: string;
          createdBy: any;
          modifiedById: string;
          modifiedBy: any;
        };
      };
    }[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
  };
}

class loanOfferService {
  static createLoanOffer = async (
    requestBody: CreateLoanOfferRequest,
  ): Promise<AxiosResponse<CreateLoanOfferResponse>> => {
    return await axiosConfig.post('/api/loan-offer', requestBody);
  };

  static getMyLoanOffer = async (): Promise<
    AxiosResponse<MyLoanOfferResponse>
  > => {
    return await axiosConfig.get('/api/loan-offer/me');
  };
}

export default loanOfferService;
