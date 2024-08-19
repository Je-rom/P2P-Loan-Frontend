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

class loanOfferService {
  static createLoanOffer = async (
    requestBody: CreateLoanOfferRequest,
  ): Promise<AxiosResponse<CreateLoanOfferResponse>> => {
    return await axiosConfig.post('api/loan-offer', requestBody);
  };
}

export default loanOfferService;
