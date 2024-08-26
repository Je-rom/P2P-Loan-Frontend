import axiosConfig from '@/config/axios';
import axios, { AxiosResponse } from 'axios';

export interface changePin{
    OldPin: string;
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
    static changePin(requestBody: changePin): Promise<AxiosResponse<changePinResponse>> {
        return axios.post(`/api/auth/change-pin`, requestBody);
    }

    static editContactInfo(requestBody: editContactInformation): Promise<AxiosResponse<editContactResponse>> {
        return axios.post(`/api/auth/edit-contact-info`, requestBody);
    }
}



export default AccountSettingsService;