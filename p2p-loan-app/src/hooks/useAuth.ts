'use client';
import AuthService, {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
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
      if (
        error.response?.data?.message ===
        'Email yet to be verified, Please verify your email'
      ) {
        toast.error('Email yet to be verified, Please verify your email');
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
      setUser(responseData.user);
      setToken(responseData.token);
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (userEmail: ForgotPasswordRequest) => {
      const reponse = await AuthService.forgotPassword(userEmail);
      return reponse.data;
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.message);
      console.log(axiosResponseMessage(error));
    },
    onSuccess: (data: ForgotPasswordResponse) => {
      const { status, message } = data;
      console.log('Forgot password successful:', message);
      toast.success('Token sent, please check your email');
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (user: ResetPasswordRequest) => {
      const response = await AuthService.resetPassword(user);
      return response.data;
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.message);
      console.log(axiosResponseMessage(error));
    },
    onSuccess: (data: ResetPasswordResponse) => {
      const { message } = data;
      toast.success('Password reset successful, please login');
    },
  });

  const logOut = () => {
    clearAuth();
    localStorage.clear();
    router.push('/login');
  };

  return {
    SignUpMutation,
    loginMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
    logOut,
    user,
    token,
  };
};

export default useAuth;
// DELETE FROM Users
// WHERE Id = '3AEE0692-CBB7-4FD5-A180-E7D153A92F70';
