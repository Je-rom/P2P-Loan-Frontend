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


export interface editContactInformation
{
    phone_number:string;
    email: string;
    state: string;

}

export interface editContactResponse{

}

class ChangePinService {
    static changepin = async (
        requestBody: changePin,
    ): Promise<AxiosResponse<changePinResponse>> => {
        return await axiosConfig.post(`/api/auth/change-pin`, requestBody);
    };

};

export default ChangePinService;