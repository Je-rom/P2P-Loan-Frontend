import axiosConfig from '@/config/axios';
import axios, { AxiosResponse } from 'axios';

export interface MyProfile {
  status: string;
  statusCode: string;
  message: string;
  result: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailConfirmed: boolean;
    pinCreated: boolean;
    userType: string;
    emailVerificationTokenExpiration: string | null;
    createdAt: string;
    modifiedAt: string;
  };
}

class ProfileService {
  static getMyProfile = async (): Promise<AxiosResponse<MyProfile>> => {
    return await axiosConfig.get('/api/User/me');
  };

  static getUserProfile = async (
    id: string,
  ): Promise<AxiosResponse<MyProfile>> => {
    return await axiosConfig.get(`/api/User/${id}`);
  };
}

export default ProfileService;
