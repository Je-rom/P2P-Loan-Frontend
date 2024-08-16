'use client';
import AuthService, {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from '@/services/authService';
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
        if (error.response?.data?.message === 'User already exists') {
          toast.error('User already exists');
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

  const loginMutation = useMutation({
    mutationFn: async (user: LoginRequest) => {
      console.log('Sending login request', user);
      const response = await AuthService.login(user);
      console.log('Received login response', response);
      return response?.data;
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      if (error.response?.data?.message === 'Email yet to be verified') {
        toast.error('Email yet to be verified');
      } else {
        toast.error('Invalid Login details, check your email and password');
      }
      console.log('register error:', error);
      console.log(error.response?.data);
    },
    onSuccess: (data: LoginResponse) => {
      const { status, result: responseData } = data;
      toast.success('Login successful');
      console.log(responseData);
      console.log('Login successful, response data:', responseData);

      const {
        id,
        firstName,
        lastName,
        email,
        bvnVerified,
        emailConfirmed,
        pinCreated,
        userType,
        createdAt,
        modifiedAt,
        userRoles,
      } = responseData.user;

      setUser({
        id,
        firstName,
        lastName,
        email,
        bvnVerified,
        emailConfirmed,
        pinCreated,
        userType,
        createdAt,
        modifiedAt,
        userRoles,
      });
      setToken(responseData.token);
    },
  });

  return {
    SignUpMutation,
    loginMutation,
    user,
    token,
  };
};

export default useAuth;
