import axiosConfig from '@/config/axios';
import axios, { AxiosResponse } from 'axios';

export interface CreateLoanRequest {
  loanOfferId: string;
  walletId: string;
  additionalInformation: string;
}

export interface CreateLoanResponse {
  status: string;
  statusCode: string;
  message: string;
  result: string;
}

export interface LoanRequestResponse {
  status: string;
  statusCode: string;
  message: string;
  result: {
    items: {
      id: string;
      userId: string;
      loanOfferId: string;
      walletId: string;
      status: string;
      additionalInformation: string;
      processingStartTime: string | null;
      user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        bvnVerified: boolean;
        userType: string;
        createdAt: string;
        modifiedAt: string;
      };
      loanOffer: {
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
          phoneNumber: string;
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
          user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
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
            createdBy: string | null;
            modifiedById: string;
            modifiedBy: string | null;
          };
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
            createdBy: string | null;
            modifiedById: string;
            modifiedBy: string | null;
          }[];
        };
        createdAt: string;
        modifiedAt: string;
      };
      wallet: {
        id: string;
        userId: string;
        walletProviderId: string;
        accountNumber: string;
        referenceId: string;
        user: {
          id: string;
          firstName: string;
          lastName: string;
          email: string;
          phoneNumber: string;
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
          createdBy: string | null;
          modifiedById: string;
          modifiedBy: string | null;
        };
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
          createdBy: string | null;
          modifiedById: string;
          modifiedBy: string | null;
        }[];
      };
    }[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
  };
}

export interface AcceptLoanRequestResponse {
  status: string;
  statusCode: string;
  message: string;
  result: string;
}

export interface DeclineLoanRequestResponse {
  status: string;
  statusCode: string;
  message: string;
  result: string;
}

class LoanRequestService {
  static createLoanRequest = async (
    requestBody: CreateLoanRequest,
  ): Promise<AxiosResponse<CreateLoanResponse>> => {
    return await axiosConfig.post('/api/loan-request', requestBody);
  };

  static getLoanRequest = async (
    trafficType: 'sent' | 'received',
    pageNumber: number,
    pageSize: number,
    totalItems: number,
  ): Promise<AxiosResponse<LoanRequestResponse>> => {
    return await axiosConfig.get('/api/loan-request/me', {
      params: { trafficType, pageNumber, pageSize, totalItems },
    });
  };

  static acceptLoanRequest = async (
    loanReqeustId: string,
  ): Promise<AxiosResponse<AcceptLoanRequestResponse>> => {
    return await axiosConfig.post(`/api/loan-request/accept/${loanReqeustId}`);
  };

  static declineLoanRequest = async (
    loanReqeustId: number,
  ): Promise<AxiosResponse<DeclineLoanRequestResponse>> => {
    return await axiosConfig.post(`/api/loan-request/decline/${loanReqeustId}`);
  };
}

export default LoanRequestService;
