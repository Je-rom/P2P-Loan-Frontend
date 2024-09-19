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
      status: 'Active' | 'Completed' | 'Defaulted';
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
    status: 'Active' | 'Completed' | 'Defaulted';
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

export interface GetALoan {
  status: string;
  statusCode: string;
  message: string;
  result: {
    id: string;
    borrowerId: string;
    lenderId: string;
    loanOfferId: string;
    loanRequestId: string;
    amountLeft: number;
    dueDate: string;
    initialInterestRate: number;
    currentInterestRate: number;
    status: 'Active' | 'Completed' | 'Defaulted';
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
    lender: null;
    loanOffer: null;
    loanRequest: null;
    createdAt: string;
    modifiedAt: string;
    createdById: string;
    createdBy: null;
    modifiedById: string;
    modifiedBy: null;
  };
}

export interface RepayLoan {
  amount: number;
  loanId: string;
  PIN: string;
}

export interface RepayLoanResponse {
  status: string;
  statusCode: string;
  message: string;
  result: {
    id: string;
    userId: string;
    loanId: string;
    amount: number;
    financialTransactionId: string | null;
    interestRate: number;
    status: string;
    loan: {
      id: string;
      borrowerId: string;
      lenderId: string;
      loanOfferId: string;
      loanRequestId: string;
      amountLeft: number;
      dueDate: string;
      initialInterestRate: number;
      currentInterestRate: number;
      status: 'Active' | 'Completed' | 'Defaulted';
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
      };
      loanRequest: {
        id: string;
        userId: string;
        loanOfferId: string;
        walletId: string;
        status: string;
        additionalInformation: string;
        processingStartTime: string;
        user: {
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
      };
    };
  };
}

export interface GetLoanRepayments {
  status: string;
  statusCode: string;
  message: string;
  result: {
    items: {
      id: string;
      userId: string;
      loanId: string;
      amount: number;
      financialTransactionId: string | null;
      interestRate: number;
      status: string;
      loan: {
        id: string;
        borrowerId: string;
        lenderId: string;
        loanOfferId: string;
        loanRequestId: string;
        amountLeft: number;
        dueDate: string;
        initialInterestRate: number;
        currentInterestRate: number;
        status: 'Active' | 'Completed' | 'Defaulted';
        repaymentFrequency: string;
        loanDurationDays: number;
        defaulted: boolean;
        principalAmount: number;
        accruingInterestRate: number;
        financialTransactionId: string | null;
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
          userRoles: any | null;
        };
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
          userRoles: any | null;
        };
      };
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
        userRoles: any | null;
      };
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
        userRoles: any | null;
      };
    }[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
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
        orderBy: 'CreatedAt dsc',
      },
    });
  };

  static myActiveLoan = async (): Promise<AxiosResponse<MyActiveLoan>> => {
    return await axiosConfig.get('/api/loan/active');
  };

  static getALoan = async (
    loanId: string,
  ): Promise<AxiosResponse<GetALoan>> => {
    return await axiosConfig.get(`/api/loan/${loanId}`);
  };

  static repayLoan = async (
    requestBody: RepayLoan,
  ): Promise<AxiosResponse<RepayLoanResponse>> => {
    return await axiosConfig.post('/api/loan/repay', requestBody);
  };

  static getLoanRepayments = async (
    loanId: string,
    totalItems: number,
    pageNumber: number,
    pageSize: number,
  ): Promise<AxiosResponse<GetLoanRepayments>> => {
    return await axiosConfig.get(`/api/loan/${loanId}/repayments`, {
      params: {
        totalItems,
        pageNumber,
        pageSize,
        orderBy: 'CreatedAt dsc',
      },
    });
  };
}

export default LoanService;
