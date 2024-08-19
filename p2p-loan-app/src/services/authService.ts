import axiosConfig from '@/config/axios';
import axios, { AxiosResponse } from 'axios';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  BVN: string;
  userType: string;
  walletProviderId: string | undefined;
  BvnDateOfBirth: string;
}

export interface RegisterResponse {
  status: string;
  statusCode: string;
  message: string;
  result: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      bvnVerified: boolean;
      emailConfirmed: boolean;
      pinCreated: boolean;
      userType: string;
      createdAt: string;
      modifiedAt: string;
      userRoles: any[];
    };
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  statusCode: string;
  message: string;
  result: {
    message: string;
    token: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      bvnVerified: boolean;
      emailConfirmed: boolean;
      pinCreated: boolean;
      userType: string;
      createdAt: string;
      modifiedAt: string;
      userRoles: any[];
    };
  };
}

export interface emailVerificationRequest {
  email: string;
  token: string;
}

export interface EmailVerificationResponse {
  status: string;
  statusCode: string;
  message: string;
  result: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      bvnVerified: boolean;
      emailConfirmed: boolean;
      pinCreated: boolean;
      userType: string;
      createdAt: string;
      modifiedAt: string;
      userRoles: any[];
    };
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  status: string;
  message: string;
  data: [];
}

export interface ResetPasswordRequest {
  token: string;
  email: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  status: string;
  statusCode: string;
  message: string;
  result: null;
}

class AuthService {
  static register = async (
    requestBody: RegisterRequest,
  ): Promise<AxiosResponse<RegisterResponse>> => {
    return await axiosConfig.post('api/auth/register', requestBody);
  };

  static login = async (
    requestBody: LoginRequest,
  ): Promise<AxiosResponse<LoginResponse>> => {
    return await axiosConfig.post('api/auth/login', requestBody);
  };

  static forgotPassword = async (
    requestBody: ForgotPasswordRequest,
  ): Promise<AxiosResponse<ForgotPasswordResponse>> => {
    return await axiosConfig.post('/api/auth/forgot-password', requestBody);
  };

  static resetPassword = async (
    requestBody: ResetPasswordRequest,
  ): Promise<AxiosResponse<ResetPasswordResponse>> => {
    return await axiosConfig.post('/api/auth/reset-password', requestBody);
  };
}

export default AuthService;
