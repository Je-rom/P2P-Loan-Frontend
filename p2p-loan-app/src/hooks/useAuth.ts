'use client';
import AuthService, { RegisterRequest } from '@/services/authService';
import { useAuthState } from '@/store/authStore';
import axiosResponseMessage from '@/lib/axiosResponseMessage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const router = useRouter();
  const { setUser, setToken, user, token, clearAuth } = useAuthState();

  const SignUpMutation = () => {
    return useMutation({
      mutationFn: async (user: RegisterRequest) => {
        console.log('Sending register request', user);
        const reponse = await AuthService.register(user);
        console.log('Received login response', reponse);
        return reponse?.data;
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        if (
          error.response?.data?.message ===
          'User already exists, the email or phone number is already in use'
        ) {
          toast.error(
            'User already exists, the email or phone number is already in use',
          );
        } else {
          toast.error('Invalid Registration credentials');
        }
        console.log('register error:', error);
        console.log(error.response?.data);
      },
      onSuccess: (data) => {
        const { status, message } = data;
        toast.success('Registration successful');
        console.log(message);
        return { status, message };
      },
    });
  };

  return {
    SignUpMutation,
    user,
    token,
  };
};

export default useAuth;
//   const loginMutation = useMutation({
//     mutationFn: async (user: LoginRequest) => {
//       console.log('Sending login request', user);
//       const response = await AuthService.login(user);
//       console.log('Received login response', response);
//       return response?.data;
//     },
//     onError: (error: AxiosError) => {
//       console.log('Login error:', error);
//       console.log(axiosResponseMessage(error));
//     },
//     onSuccess: (data: LoginResponse) => {
//       const { status, data: responseData } = data;
//       toast.success('Login successful');
//       console.log(responseData);
//       console.log('Login successful, response data:', responseData);
//       const user = {
//         userId: responseData.userId,
//         username: responseData.username,
//         phoneNumber: responseData.phoneNumber,
//         email: responseData.email,
//         account_type: responseData.account_type,
//         profileImage: responseData.profileImage,
//         status: responseData.status,
//         createdAt: responseData.createdAt,
//         token: responseData.token,
//       };
//       setUser(user);
//       setToken(responseData.token);
//     },
//   });
