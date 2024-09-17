import axiosConfig from '@/config/axios';
import axios, { AxiosResponse } from 'axios';

export interface MyLoanResponse {
  status: string;
  statusCode: string;
  message: string;
  result: {
    items: {
      id: string;
      borrowerId: string;
      lenderId: string | null;
      loanOfferId: string | null;
      loanRequestId: string | null;
      amountLeft: number;
      dueDate: string;
      initialInterestRate: number;
      currentInterestRate: number;
      status: string;
      repaymentFrequency: string;
      loanDurationDays: number;
      defaulted: boolean;
      principalAmount: number;
      accruingInterestRate: number;
      financialTransactionId: string;
      borrower: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        userType: string;
        pin: string;
        pinCreated: boolean;
        bvn: string;
        nin: string;
        phoneNumber: string;
        photo: string | null;
        passwordResetToken: string | null;
        passwordResetTokenExpiration: string | null;
        emailVerificationToken: string | null;
        emailConfirmed: boolean;
        emailVerificationTokenExpiration: string | null;
        createdAt: string;
        modifiedAt: string;
        userRoles: any | null;
      };
      lender: {
        firstName: string;
        lastName: string;
      };
      loanOffer: any | null;
      loanRequest: any | null;
      createdAt: string;
      modifiedAt: string;
      createdById: string;
      createdBy: any | null;
      modifiedById: string;
      modifiedBy: any | null;
    }[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
  };
}

export interface MyActiveLoan {
  status: string;
  statusCode: string;
  message: string;
  result: {
    id: string;
    borrowerId: string;
    lenderId: string | null;
    loanOfferId: string | null;
    loanRequestId: string | null;
    amountLeft: number;
    dueDate: string;
    initialInterestRate: number;
    currentInterestRate: number;
    status: string;
    repaymentFrequency: string;
    loanDurationDays: number;
    defaulted: boolean;
    principalAmount: number;
    accruingInterestRate: number;
    financialTransactionId: string;
    borrower: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      userType: string;
      pin: string;
      pinCreated: boolean;
      bvn: string;
      nin: string;
      phoneNumber: string;
      photo: string | null;
      passwordResetToken: string | null;
      passwordResetTokenExpiration: string | null;
      emailVerificationToken: string | null;
      emailConfirmed: boolean;
      emailVerificationTokenExpiration: string | null;
      createdAt: string;
      modifiedAt: string;
      userRoles: string[] | null;
    };
    lender: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      userType: string;
      pin: string;
      pinCreated: boolean;
      bvn: string;
      nin: string;
      phoneNumber: string;
      photo: string | null;
      passwordResetToken: string | null;
      passwordResetTokenExpiration: string | null;
      emailVerificationToken: string | null;
      emailConfirmed: boolean;
      emailVerificationTokenExpiration: string | null;
      createdAt: string;
      modifiedAt: string;
      userRoles: string[] | null;
    } | null;
    loanOffer: any | null;
    loanRequest: any | null;
    createdAt: string;
    modifiedAt: string;
    createdById: string;
    createdBy: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      userType: string;
      pin: string;
      pinCreated: boolean;
      bvn: string;
      nin: string;
      phoneNumber: string;
      photo: string | null;
      passwordResetToken: string | null;
      passwordResetTokenExpiration: string | null;
      emailVerificationToken: string | null;
      emailConfirmed: boolean;
      emailVerificationTokenExpiration: string | null;
      createdAt: string;
      modifiedAt: string;
      userRoles: string[] | null;
    } | null;
    modifiedById: string;
    modifiedBy: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      userType: string;
      pin: string;
      pinCreated: boolean;
      bvn: string;
      nin: string;
      phoneNumber: string;
      photo: string | null;
      passwordResetToken: string | null;
      passwordResetTokenExpiration: string | null;
      emailVerificationToken: string | null;
      emailConfirmed: boolean;
      emailVerificationTokenExpiration: string | null;
      createdAt: string;
      modifiedAt: string;
      userRoles: string[] | null;
    } | null;
  };
}

class LoanService {
  static myLoan = async (
    pageNumber: number,
    pageSize: number,
    totalItems: number,
  ): Promise<AxiosResponse<MyLoanResponse>> => {
    return await axiosConfig.get('/api/loan', {
      params: {
        pageNumber,
        pageSize,
        totalItems,
      },
    });
  };

  static myActiveLoan = async (): Promise<AxiosResponse<MyActiveLoan>> => {
    return await axiosConfig.get('/api/loan/active');
  };
}

export default LoanService;
