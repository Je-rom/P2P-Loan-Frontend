import axiosConfig from '@/config/axios';
import axios, { AxiosResponse } from 'axios';

export interface changePin{
    oldPin: string;
    newPin: string;
    confirmNewPin:string;
}

export interface changePinResponse{
    status: string;
    statusCode: string;
    message:string;
    result:null;
}


export interface editContactInformation {
    phone_number: string;
    email: string;
    state: string;
}

export interface editContactResponse {
    status: string;
    statusCode: string;
    message: string;
    result: null;
}

class AccountSettingsService {
    static async changePin(requestBody: changePin): Promise<AxiosResponse<changePinResponse>> {
       // return axiosConfig.patch('api/auth/change-pin', requestBody);
     try {
        const response = await axiosConfig.patch('api/auth/change-pin', requestBody);
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error in changePin:', error);
        throw error;
    }
}

    static editContactInfo(requestBody: editContactInformation): Promise<AxiosResponse<editContactResponse>> {
        return axiosConfig.post(`/api/auth/edit-contact-info`, requestBody);
    }
}



export default AccountSettingsService;